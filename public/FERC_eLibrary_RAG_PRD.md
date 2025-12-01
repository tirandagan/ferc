# FERC eLibrary RAG Search System
## Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** December 2025  
**Status:** Draft  

---

## 1. Executive Summary

The FERC eLibrary RAG (Retrieval-Augmented Generation) Search System is a modernized interface for the Federal Energy Regulatory Commission's document library. It combines traditional keyword search with AI-powered semantic search and conversational document discovery, enabling legal professionals, energy industry analysts, and researchers to efficiently access and understand regulatory documents.

### 1.1 Vision Statement

Transform the FERC eLibrary from a dated, form-heavy government portal into an intelligent, user-friendly research platform that leverages modern AI capabilities to surface relevant regulatory information quickly and accurately.

### 1.2 Key Objectives

- Reduce average document discovery time by 60%
- Enable natural language queries for complex regulatory questions
- Provide inline document previews with highlighted relevant passages
- Maintain full compliance with government accessibility standards (WCAG 2.1 AA)

---

## 2. System Architecture

### 2.1 High-Level Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                        │
├─────────────────────────────────────────────────────────────────┤
│  Search Interface  │  AI Chat Panel  │  Document Viewer        │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API Layer (Next.js API Routes)              │
├─────────────────────────────────────────────────────────────────┤
│  /api/search  │  /api/chat  │  /api/documents  │  /api/embed   │
└─────────────────────────────────────────────────────────────────┘
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
┌───────────────────────────┐   ┌───────────────────────────────┐
│   Vector Database         │   │   LLM Service                 │
│   (Supabase pgvector)     │   │   (OpenAI/Anthropic)          │
├───────────────────────────┤   ├───────────────────────────────┤
│  - Document chunks        │   │  - Chat completions           │
│  - Embedding vectors      │   │  - Embedding generation       │
│  - Metadata storage       │   │  - Response streaming         │
└───────────────────────────┘   └───────────────────────────────┘
                    │
                    ▼
┌───────────────────────────────────────────────────────────────┐
│                   Document Storage (Vercel Blob)               │
├───────────────────────────────────────────────────────────────┤
│  - Original PDFs          │  - Processed text files          │
└───────────────────────────────────────────────────────────────┘
\`\`\`

### 2.2 Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | Next.js 15 (App Router) | React framework with SSR |
| UI Components | shadcn/ui + Tailwind CSS v4 | Component library |
| State Management | SWR | Data fetching and caching |
| Vector Database | Supabase (pgvector) | Document embeddings storage |
| LLM | Vercel AI SDK + OpenAI | Chat and embedding generation |
| File Storage | Vercel Blob | PDF and document storage |
| Deployment | Vercel | Hosting and edge functions |

---

## 3. Core Features

### 3.1 Search Interface

#### 3.1.1 Multi-Modal Search

| Search Type | Description | Implementation |
|-------------|-------------|----------------|
| Keyword Search | Traditional text matching | PostgreSQL full-text search |
| Docket Search | Search by docket number | Exact/prefix matching |
| AI Search | Natural language queries | Vector similarity search |

#### 3.1.2 Search Filters

\`\`\`typescript
interface SearchFilters {
  dateRange: {
    from: Date;
    to: Date;
  };
  category: 'Submittal' | 'Issuance' | 'Notice' | 'All';
  documentType: string[];
  docketNumber: string;
  subDocket: string;
  securityLevel: 'Public' | 'CEII' | 'Privileged';
  searchIn: {
    description: boolean;
    fullText: boolean;
  };
}
\`\`\`

#### 3.1.3 Search Results

- Card-based layout with document metadata
- Inline preview capability
- PDF download buttons
- Sort options (Date Filed, Relevance, Docket Number)
- Pagination with configurable rows per page

### 3.2 AI Assistant

#### 3.2.1 Conversational Interface

The AI Assistant provides a chat-based interface for document discovery and question answering.

**Capabilities:**
- Natural language document queries
- Multi-turn conversations with context retention
- Source citation with document links
- Suggested follow-up questions

#### 3.2.2 RAG Pipeline

\`\`\`
User Query → Embed Query → Vector Search → Retrieve Chunks → 
Augment Prompt → LLM Generation → Stream Response → Display with Citations
\`\`\`

**Pipeline Details:**

1. **Query Embedding**: Convert user question to vector using `text-embedding-3-small`
2. **Vector Search**: Find top-k similar document chunks using cosine similarity
3. **Context Assembly**: Combine retrieved chunks with system prompt
4. **Response Generation**: Stream response from LLM with citations
5. **Citation Extraction**: Parse document references and create clickable links

#### 3.2.3 Source Citations

Each AI response includes expandable source citations:

\`\`\`typescript
interface SourceCitation {
  id: string;
  title: string;
  docketNumber: string;
  date: string;
  relevantExcerpt: string;
  pageNumber: number;
  pdfUrl: string;
  highlightPositions: {
    start: number;
    end: number;
  }[];
}
\`\`\`

### 3.3 Document Viewer

#### 3.3.1 PDF Modal Viewer

- Full-screen modal with document rendering
- Page navigation controls
- Zoom controls (50% - 200%)
- Text highlighting for relevant passages
- Highlights sidebar for quick navigation
- Download original PDF button

#### 3.3.2 Highlight Integration

When opening a document from AI citations:
- Automatically scroll to relevant section
- Highlight matching text passages
- Show sidebar with all highlights
- Click highlight to jump to location

---

## 4. Database Schema

### 4.1 Tables

#### documents

\`\`\`sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  accession_number VARCHAR(20) UNIQUE NOT NULL,
  docket_number VARCHAR(50) NOT NULL,
  sub_docket VARCHAR(10),
  title TEXT NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  document_type VARCHAR(100),
  class_type VARCHAR(200),
  security_level VARCHAR(20) DEFAULT 'Public',
  filed_date DATE NOT NULL,
  document_date DATE,
  file_url TEXT,
  file_size_bytes BIGINT,
  page_count INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_documents_docket ON documents(docket_number);
CREATE INDEX idx_documents_filed_date ON documents(filed_date DESC);
CREATE INDEX idx_documents_category ON documents(category);
\`\`\`

#### document_chunks

\`\`\`sql
CREATE TABLE document_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  chunk_index INTEGER NOT NULL,
  content TEXT NOT NULL,
  page_number INTEGER,
  start_char INTEGER,
  end_char INTEGER,
  embedding VECTOR(1536),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_chunks_document ON document_chunks(document_id);
CREATE INDEX idx_chunks_embedding ON document_chunks 
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
\`\`\`

#### chat_sessions

\`\`\`sql
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
\`\`\`

#### chat_messages

\`\`\`sql
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL, -- 'user' | 'assistant'
  content TEXT NOT NULL,
  sources JSONB, -- Array of SourceCitation objects
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_session ON chat_messages(session_id);
\`\`\`

### 4.2 Vector Search Function

\`\`\`sql
CREATE OR REPLACE FUNCTION search_documents(
  query_embedding VECTOR(1536),
  match_threshold FLOAT DEFAULT 0.7,
  match_count INT DEFAULT 10
)
RETURNS TABLE (
  chunk_id UUID,
  document_id UUID,
  content TEXT,
  page_number INTEGER,
  similarity FLOAT,
  accession_number VARCHAR,
  title TEXT,
  docket_number VARCHAR,
  filed_date DATE
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    dc.id AS chunk_id,
    dc.document_id,
    dc.content,
    dc.page_number,
    1 - (dc.embedding <=> query_embedding) AS similarity,
    d.accession_number,
    d.title,
    d.docket_number,
    d.filed_date
  FROM document_chunks dc
  JOIN documents d ON dc.document_id = d.id
  WHERE 1 - (dc.embedding <=> query_embedding) > match_threshold
  ORDER BY dc.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
\`\`\`

---

## 5. API Endpoints

### 5.1 Search API

#### POST /api/search

\`\`\`typescript
// Request
interface SearchRequest {
  query: string;
  filters: SearchFilters;
  page: number;
  limit: number;
  sortBy: 'date' | 'relevance' | 'docket';
  sortOrder: 'asc' | 'desc';
}

// Response
interface SearchResponse {
  results: Document[];
  total: number;
  page: number;
  totalPages: number;
  facets: {
    categories: { name: string; count: number }[];
    documentTypes: { name: string; count: number }[];
    years: { year: number; count: number }[];
  };
}
\`\`\`

### 5.2 Chat API

#### POST /api/chat

\`\`\`typescript
// Request
interface ChatRequest {
  sessionId?: string;
  message: string;
}

// Response (Server-Sent Events stream)
interface ChatStreamEvent {
  type: 'text' | 'sources' | 'done' | 'error';
  content?: string;
  sources?: SourceCitation[];
  error?: string;
}
\`\`\`

### 5.3 Documents API

#### GET /api/documents/:id

Returns document metadata and signed URL for PDF access.

#### GET /api/documents/:id/chunks

Returns document chunks with optional highlight positions.

---

## 6. Implementation Guide

### 6.1 Environment Variables

\`\`\`env
# Database
DATABASE_URL=postgresql://...
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# AI Services
OPENAI_API_KEY=sk-...

# Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_...

# Application
NEXT_PUBLIC_APP_URL=https://elibrary.ferc.gov
\`\`\`

### 6.2 Document Ingestion Pipeline

\`\`\`typescript
// scripts/ingest-documents.ts

import { createClient } from '@supabase/supabase-js';
import { OpenAI } from 'openai';
import { put } from '@vercel/blob';
import pdfParse from 'pdf-parse';

const CHUNK_SIZE = 1000; // characters
const CHUNK_OVERLAP = 200; // characters

async function ingestDocument(pdfBuffer: Buffer, metadata: DocumentMetadata) {
  // 1. Parse PDF
  const pdfData = await pdfParse(pdfBuffer);
  const text = pdfData.text;
  
  // 2. Upload original PDF to Blob storage
  const { url } = await put(
    `documents/${metadata.accessionNumber}.pdf`,
    pdfBuffer,
    { access: 'public' }
  );
  
  // 3. Create document record
  const { data: document } = await supabase
    .from('documents')
    .insert({
      accession_number: metadata.accessionNumber,
      docket_number: metadata.docketNumber,
      title: metadata.title,
      description: metadata.description,
      category: metadata.category,
      filed_date: metadata.filedDate,
      file_url: url,
      page_count: pdfData.numpages,
    })
    .select()
    .single();
  
  // 4. Chunk text
  const chunks = chunkText(text, CHUNK_SIZE, CHUNK_OVERLAP);
  
  // 5. Generate embeddings
  const embeddings = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: chunks.map(c => c.content),
  });
  
  // 6. Store chunks with embeddings
  const chunkRecords = chunks.map((chunk, i) => ({
    document_id: document.id,
    chunk_index: i,
    content: chunk.content,
    page_number: chunk.pageNumber,
    start_char: chunk.startChar,
    end_char: chunk.endChar,
    embedding: embeddings.data[i].embedding,
  }));
  
  await supabase.from('document_chunks').insert(chunkRecords);
}

function chunkText(text: string, size: number, overlap: number) {
  const chunks = [];
  let start = 0;
  
  while (start < text.length) {
    const end = Math.min(start + size, text.length);
    chunks.push({
      content: text.slice(start, end),
      startChar: start,
      endChar: end,
    });
    start += size - overlap;
  }
  
  return chunks;
}
\`\`\`

### 6.3 RAG Chat Implementation

\`\`\`typescript
// app/api/chat/route.ts

import { OpenAI } from 'openai';
import { createClient } from '@supabase/supabase-js';
import { StreamingTextResponse } from 'ai';

const SYSTEM_PROMPT = `You are an expert assistant for the FERC eLibrary, 
helping users find and understand Federal Energy Regulatory Commission documents.

When answering questions:
1. Base your answers ONLY on the provided document context
2. Cite specific documents using their accession numbers
3. If the context doesn't contain relevant information, say so
4. Be precise about regulatory requirements and dates
5. Suggest related documents or follow-up queries when appropriate

Format citations as: [Document Title (Accession Number)]`;

export async function POST(req: Request) {
  const { sessionId, message } = await req.json();
  
  // 1. Generate query embedding
  const queryEmbedding = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: message,
  });
  
  // 2. Search for relevant chunks
  const { data: chunks } = await supabase.rpc('search_documents', {
    query_embedding: queryEmbedding.data[0].embedding,
    match_threshold: 0.7,
    match_count: 10,
  });
  
  // 3. Build context from chunks
  const context = chunks
    .map(c => `[${c.title} (${c.accession_number}), Page ${c.page_number}]:\n${c.content}`)
    .join('\n\n---\n\n');
  
  // 4. Generate streaming response
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    stream: true,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `Context:\n${context}\n\nQuestion: ${message}` },
    ],
  });
  
  // 5. Return streaming response with sources
  const stream = new ReadableStream({
    async start(controller) {
      // Send sources first
      controller.enqueue(
        `data: ${JSON.stringify({ type: 'sources', sources: formatSources(chunks) })}\n\n`
      );
      
      // Stream text
      for await (const chunk of response) {
        const text = chunk.choices[0]?.delta?.content || '';
        if (text) {
          controller.enqueue(
            `data: ${JSON.stringify({ type: 'text', content: text })}\n\n`
          );
        }
      }
      
      controller.enqueue(`data: ${JSON.stringify({ type: 'done' })}\n\n`);
      controller.close();
    },
  });
  
  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' },
  });
}
\`\`\`

### 6.4 Frontend Chat Hook

\`\`\`typescript
// hooks/use-chat.ts

import { useState, useCallback } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: SourceCitation[];
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content }),
      });
      
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const lines = decoder.decode(value).split('\n');
        
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          
          const data = JSON.parse(line.slice(6));
          
          if (data.type === 'text') {
            setMessages(prev => prev.map(m => 
              m.id === assistantMessage.id
                ? { ...m, content: m.content + data.content }
                : m
            ));
          } else if (data.type === 'sources') {
            setMessages(prev => prev.map(m =>
              m.id === assistantMessage.id
                ? { ...m, sources: data.sources }
                : m
            ));
          }
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return { messages, sendMessage, isLoading };
}
\`\`\`

---

## 7. Accessibility Requirements

### 7.1 WCAG 2.1 AA Compliance

| Requirement | Implementation |
|-------------|----------------|
| Keyboard Navigation | Full tab navigation, focus indicators |
| Screen Reader | ARIA labels, live regions for updates |
| Color Contrast | Minimum 4.5:1 for text, 3:1 for UI |
| Focus Management | Modal focus trapping, return focus |
| Text Sizing | Supports 200% zoom without loss |
| Motion | Respects prefers-reduced-motion |

### 7.2 Accessibility Testing

- Automated: axe-core, Lighthouse
- Manual: VoiceOver (macOS), NVDA (Windows)
- Keyboard-only navigation testing

---

## 8. Performance Requirements

| Metric | Target | Measurement |
|--------|--------|-------------|
| Time to First Byte | < 200ms | Edge function cold start |
| First Contentful Paint | < 1.5s | Lighthouse |
| Search Response Time | < 500ms | API latency (p95) |
| AI Response Start | < 2s | Time to first token |
| PDF Load Time | < 3s | Document viewer ready |

### 8.1 Optimization Strategies

- Edge caching for search results
- Streaming responses for AI chat
- Lazy loading for search result cards
- Virtualized lists for large result sets
- Progressive PDF loading

---

## 9. Security Considerations

### 9.1 Document Access Control

\`\`\`typescript
// Row Level Security for Supabase
CREATE POLICY "Public documents are viewable by all"
  ON documents FOR SELECT
  USING (security_level = 'Public');

CREATE POLICY "CEII documents require authentication"
  ON documents FOR SELECT
  USING (
    security_level = 'CEII' 
    AND auth.uid() IS NOT NULL
    AND has_ceii_access(auth.uid())
  );
\`\`\`

### 9.2 API Security

- Rate limiting: 100 requests/minute for search, 20/minute for chat
- Input validation and sanitization
- SQL injection prevention via parameterized queries
- XSS prevention via React's built-in escaping

---

## 10. Future Enhancements

### Phase 2 Features

- [ ] Saved searches with email notifications
- [ ] Document comparison tool
- [ ] Batch document download
- [ ] Custom document collections
- [ ] Advanced analytics dashboard

### Phase 3 Features

- [ ] Multi-language support
- [ ] Voice search
- [ ] Mobile native apps
- [ ] API access for third-party integrations
- [ ] Document summarization

---

## Appendix A: Component Reference

| Component | File | Purpose |
|-----------|------|---------|
| SearchInterface | `components/search-interface.tsx` | Main search bar and tabs |
| FilterPanel | `components/filter-panel.tsx` | Advanced filter controls |
| SearchResults | `components/search-results.tsx` | Result cards and pagination |
| AIChatPanel | `components/ai-chat-panel.tsx` | Conversational AI interface |
| PDFViewerModal | `components/pdf-viewer-modal.tsx` | Document viewer with highlights |
| Header | `components/header.tsx` | Navigation and branding |

---

## Appendix B: Glossary

| Term | Definition |
|------|------------|
| Accession Number | Unique identifier for each FERC document |
| Docket | A file containing records for a specific proceeding |
| CEII | Critical Energy Infrastructure Information (restricted) |
| RAG | Retrieval-Augmented Generation |
| Vector Search | Semantic similarity search using embeddings |
| Chunk | A segment of document text for embedding |

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Dec 2025 | v0 | Initial draft |
