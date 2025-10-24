export default function LabHomePage() {
  const projects = [
    {
      name: 'Calculator',
      path: '/lab/calculator',
      description: 'A simple calculator application',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      status: 'Coming Soon',
    },
    {
      name: 'Todo App',
      path: '/lab/todo',
      description: 'Task management application',
      tech: ['Next.js', 'Zustand', 'shadcn/ui'],
      status: 'Coming Soon',
    },
  ];

  return (
    <div className="container max-w-6xl py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Lab</h1>
        <p className="text-muted-foreground text-lg">
          Experimental projects and side applications
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.name}
            className="block p-6 border rounded-lg hover:border-primary transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-xl font-semibold">{project.name}</h2>
              <span className="text-xs bg-secondary px-2 py-1 rounded">
                {project.status}
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              {project.description}
            </p>

            <div className="flex gap-2 flex-wrap">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs text-muted-foreground border px-2 py-1 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function generateMetadata() {
  return {
    title: 'Lab - Michael Lo',
    description: 'Experimental projects and side applications',
  };
}
