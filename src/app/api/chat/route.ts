import { NextResponse } from "next/server";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    // Recibir los messages (historial de conversación) y la consulta actual
    const { messages } = await req.json();

    const allDirections = await db.directions.findMany();
    const directionContent = allDirections[0].content;

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    // Extraer la consulta más reciente del usuario
    const query = messages[messages.length - 1].content;

    if (!query) {
      return NextResponse.json(
        { error: "Query is required in the last message" },
        { status: 400 }
      );
    }

    const indexName = process.env.PINECONE_INDEXNAME || "";

    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-ada-002",
    });

    const pinecone = new PineconeClient();
    const pineconeIndex = pinecone.Index(indexName);

    const vectorStore = new PineconeStore(embeddings, {
      pineconeIndex,
      maxConcurrency: 5,
    });

    // Generar embedding para la consulta
    const embedding = await embeddings.embedQuery(query);

    // Buscar chunks relacionados en Pinecone
    const results = await vectorStore.similaritySearchVectorWithScore(
      embedding,
      5 // Limita a los 5 resultados más relevantes
    );

    // Extraer los `pageContent` de los resultados
    const pageContents = results.map(([document]) => document.pageContent);

    // Combinar los chunks en un contexto
    const context = pageContents.join("\n\n");

    // Añadir el contexto al historial de mensajes
    const updatedMessages = [
      {
        role: "system",
        content: directionContent,
      },
      ...messages,
      {
        role: "user",
        content: `Contexto:\n${context}\n\nPregunta: ${query}`,
      },
    ];

    // Usar el Vercel AI SDK para generar una respuesta
    const result = streamText({
      model: openai("gpt-4o"),
      messages: updatedMessages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error(
      "Error during semantic search or response generation:",
      error
    );
    return NextResponse.json(
      { error: "Failed to process the request" },
      { status: 500 }
    );
  }
}
