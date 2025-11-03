import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Database, Zap, Lock, Code2, Search, Download, Cpu, GitBranch } from "lucide-react";

const Index = () => {
  const technicalSpecs = [
    {
      icon: Cpu,
      title: "Vector Dimensions",
      value: "384",
      description: "Fixed-length embedding vectors"
    },
    {
      icon: Code2,
      title: "Algorithm",
      value: "Deterministic Hash",
      description: "Consistent text-to-vector conversion"
    },
    {
      icon: Search,
      title: "Search Method",
      value: "Cosine Similarity",
      description: "Fast semantic matching"
    },
    {
      icon: Lock,
      title: "Storage",
      value: "sessionStorage",
      description: "Client-side only, no backend"
    },
    {
      icon: GitBranch,
      title: "Framework",
      value: "React + TypeScript",
      description: "Built with Vite"
    },
    {
      icon: Download,
      title: "Data Export",
      value: "JSON Format",
      description: "Import/Export capability"
    }
  ];

  const features = [
    {
      icon: Database,
      title: "Browser-Based Vector DB",
      description: "Store and query text embeddings entirely in your browser with zero setup"
    },
    {
      icon: Zap,
      title: "Instant Vectorization",
      description: "Convert text to 384-dimensional vectors using a deterministic algorithm"
    },
    {
      icon: Search,
      title: "Semantic Search",
      description: "Find similar entries using cosine similarity ranking"
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "All data stays local - nothing sent to servers"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
              <Database className="h-8 w-8 text-white" />
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
              VectorDB Browser
            </h1>
            <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
              A client-side vector database with semantic search
            </p>
            <p className="mb-10 text-base text-muted-foreground max-w-2xl mx-auto">
              Store, search, and visualize text embeddings entirely in your browser. 
              No backend required. Perfect for prototyping, learning, and privacy-conscious applications.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/app">
                <Button size="lg" className="w-full sm:w-auto">
                  Try It Now
                  <Zap className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="border-b py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Technical Specifications
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with modern web technologies for maximum performance and reliability
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {technicalSpecs.map((spec, index) => (
              <Card key={index} className="bg-gradient-card border-border/50">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <spec.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-1 font-semibold">{spec.title}</h3>
                  <div className="mb-2 text-2xl font-bold text-primary">{spec.value}</div>
                  <p className="text-sm text-muted-foreground">{spec.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Key Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need for vector-based similarity search
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-primary">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-primary p-12 text-center shadow-glow">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Ready to explore vector search?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Start storing and searching text embeddings right in your browser
            </p>
            <Link to="/app">
              <Button size="lg" variant="secondary" className="shadow-lg">
                Launch VectorDB Browser
                <Database className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              <span className="font-semibold">VectorDB Browser</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built with React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
