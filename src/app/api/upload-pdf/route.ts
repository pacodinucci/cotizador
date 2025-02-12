import { NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No se proporcionó un archivo." },
        { status: 400 }
      );
    }

    // Guardar temporalmente el archivo en el servidor
    const buffer = Buffer.from(await file.arrayBuffer());
    const tempFilePath = path.join(process.cwd(), "temp", file.name);
    fs.mkdirSync(path.dirname(tempFilePath), { recursive: true });
    fs.writeFileSync(tempFilePath, buffer);

    // Procesar el PDF usando PDFLoader
    const loader = new PDFLoader(tempFilePath);
    const docs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const allSplits = await textSplitter.splitDocuments(docs);

    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-ada-002",
    });

    const indexName = process.env.PINECONE_INDEXNAME || "";
    const pinecone = new PineconeClient();
    const existingIndexes = await pinecone.listIndexes();

    const indexExists = existingIndexes.indexes?.some(
      (index: { name: string }) => index.name === indexName
    );

    let pineconeIndex;

    if (!indexExists) {
      await pinecone.createIndex({
        name: indexName,
        dimension: 1536,
        metric: "cosine",
        spec: {
          serverless: {
            cloud: "aws",
            region: "us-east-1",
          },
        },
      });
      pineconeIndex = pinecone.Index(indexName);
    } else {
      pineconeIndex = pinecone.Index(indexName);
    }

    const vectorStore = new PineconeStore(embeddings, {
      pineconeIndex,
      maxConcurrency: 5,
    });

    await vectorStore.addDocuments(allSplits);

    // Eliminar el archivo temporal después de procesarlo
    fs.unlinkSync(tempFilePath);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error al procesar el PDF:", error);
    return NextResponse.json(
      { error: "Error al procesar el PDF." },
      { status: 500 }
    );
  }
}
