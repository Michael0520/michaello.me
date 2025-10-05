import Link from 'next/link';
import { siteConfig } from '@milo-me/site-config';

export default function ProjectsPage() {
  const labProjects = [
    {
      name: 'Calculator',
      path: '/lab/calculator',
      description: 'A simple calculator application',
      status: 'Coming Soon',
    },
    {
      name: 'Todo App',
      path: '/lab/todo',
      description: 'Task management application',
      status: 'Coming Soon',
    },
  ];

  return (
    <div className="container max-w-6xl py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-muted-foreground text-lg">
          Experimental apps and side projects
        </p>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Lab Projects</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {labProjects.map((project) => (
            <div
              key={project.name}
              className="p-6 border rounded-lg hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <span className="text-xs bg-secondary px-2 py-1 rounded">
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link
            href="/lab"
            className="text-primary hover:underline inline-flex items-center gap-2"
          >
            View all lab projects →
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">
          Open Source
        </h2>
        <div className="text-center text-muted-foreground py-8">
          Check out my{' '}
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            GitHub profile
          </a>{' '}
          for open source contributions
        </div>
      </section>
    </div>
  );
}

export function generateMetadata() {
  return {
    title: `Projects - ${siteConfig.site.name}`,
    description: 'Experimental apps and side projects',
    openGraph: {
      title: `Projects - ${siteConfig.site.name}`,
      description: 'Experimental apps and side projects',
      url: `${siteConfig.site.url}/projects`,
    },
  };
}
