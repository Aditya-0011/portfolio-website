import { GetUserDetails } from "@/data/user-details";
import { GetProjects } from "@/data/projects";
import { GetExperiences } from "@/data/experiences";

export async function getMarkdownForPath(
  path: string,
): Promise<{ content: string; status: number }> {
  if (path === "") path = "/";
  if (!path.startsWith("/")) path = `/${path}`;

  try {
    switch (path) {
      case "/":
        return { content: await generateHomeMarkdown(), status: 200 };
      case "/projects":
        return { content: await generateProjectsMarkdown(), status: 200 };
      case "/contact":
        return { content: generateContactMarkdown(), status: 200 };
      case "/architecture":
        return { content: await generateArchitectureMarkdown(), status: 200 };
      case "/resume":
        return { content: generateResumeMarkdown(), status: 200 };
      case "/privacy":
        return { content: generatePrivacyMarkdown(), status: 200 };
      default:
        return { content: generateNotFoundMarkdown(path), status: 404 };
    }
  } catch (error) {
    console.error("Error generating markdown for path:", path, error);
    return {
      content: `# Error\n\nThere was an error generating the content for ${path}. Please try again later.`,
      status: 500,
    };
  }
}

async function generateHomeMarkdown() {
  const details = await GetUserDetails();
  const { projects } = await GetProjects({ Featured: true });
  const { experiences } = await GetExperiences();

  let md = `# Aditya Punmiya\n\n`;
  md += `${details.about}\n\n`;

  md += `## Experience\n\n`;
  experiences.slice(0, 3).forEach((exp) => {
    md += `### ${exp.company}\n`;
    md += `**Tenure:** ${exp.tenure} (${exp.start} - ${exp.end || "Present"})\n\n`;
    exp.positions.forEach((pos) => {
      md += `#### ${pos.role}\n`;
      md += `${pos.work_done}\n\n`;
    });
  });

  if (projects.length > 0) {
    md += `## Featured Projects\n\n`;
    projects.forEach((p) => {
      md += `### ${p.name}\n`;
      md += `${p.description}\n`;
      if (p.project_url) md += `[View Project](${p.project_url}) | `;
      if (p.github_url) md += `[GitHub](${p.github_url})`;
      md += `\n\n`;
    });
  }

  md += `\n[View Full Resume](/resume) | [Contact Me](/contact)`;

  return md;
}

async function generateProjectsMarkdown() {
  const { projects } = await GetProjects({ Featured: false });

  let md = `# Projects\n\nHere's a list of projects I have worked on or am working on.\n\n`;

  projects.forEach((p) => {
    md += `## ${p.name}\n`;
    if (p.featured) md += `*(Featured)*\n\n`;
    md += `${p.description}\n\n`;

    if (p.technologies && p.technologies.length > 0) {
      md += `**Technologies:** ${p.technologies.map((t) => t.name).join(", ")}\n\n`;
    }

    if (p.project_url) md += `- [Live Demo](${p.project_url})\n`;
    if (p.github_url) md += `- [Source Code](${p.github_url})\n`;

    md += `\n---\n\n`;
  });

  return md;
}

function generateContactMarkdown() {
  return `# Contact Aditya Punmiya\n
Get in touch with me through any of the following platforms:

- **Email**: [adityapunmiya@gmail.com](mailto:adityapunmiya@gmail.com)
- **LinkedIn**: [Aditya Punmiya](https://www.linkedin.com/in/aditya-punmiya/)
- **GitHub**: [Aditya-0011](https://github.com/Aditya-0011)
- **Instagram**: [@aditya_punmiya](https://www.instagram.com/aditya_punmiya/)

You can also use the contact form on my website at [https://adityapunmiya.com/contact](https://adityapunmiya.com/contact).
`;
}

async function generateArchitectureMarkdown() {
  try {
    const { env } = await import("@/lib/env");
    const res = await fetch(env.ARCHITECTURE_URL);
    if (res.ok) {
      return await res.text();
    }
    return `# Platform Architecture\n\nUnable to load the full architecture document at this time. Please visit [the web version](/architecture).`;
  } catch (e) {
    return `# Platform Architecture\n\nDocument currently unavailable.`;
  }
}

function generateResumeMarkdown() {
  return `# Resume: Aditya Punmiya\n
My full resume is available as a PDF document.

[**Download or View Resume PDF**](https://adityapunmiya.com/resume.pdf)

To see a summary of my experience and projects, please visit the [Homepage](/).
`;
}

function generatePrivacyMarkdown() {
  return `# Privacy Policy\n
At Aditya Punmiya's Portfolio (adityapunmiya.com), your privacy is important.

## Data Collection and Usage
- **Analytics:** We use Vercel Analytics, Google Analytics, and Microsoft Clarity to understand how visitors interact with the website. These services may collect anonymous usage data, including pages visited, browser type, and rough geographic location.
- **Contact Form:** If you use the contact form, the information you provide (name, email, message) is used solely to respond to your inquiry. We do not sell or share this information with third parties.
- **Cookies:** Our analytics providers and spam-protection services (like Cloudflare Turnstile) may use cookies or similar technologies to function properly.

## Third-Party Services
We rely on third-party services which have their own privacy policies:
- Vercel (Hosting & Analytics)
- Google Analytics
- Microsoft Clarity
- Cloudflare Turnstile (Bot protection)

## Contact
If you have any questions about this privacy policy, please contact me via the [Contact Page](/contact) or by email at adityapunmiya@gmail.com.
`;
}

function generateNotFoundMarkdown(path: string) {
  return `# 404 - Not Found\n
The page you requested (\`${path}\`) does not exist on this server.

## Helpful Links to Recover
- [Sitemap](https://adityapunmiya.com/sitemap.xml)
- [Agent Instructions](https://adityapunmiya.com/llms.txt)
- [Homepage](https://adityapunmiya.com/)
- [Projects](https://adityapunmiya.com/projects)
- [Contact](https://adityapunmiya.com/contact)

Are you an AI agent? You can read more about how to interact with this site in the \`llms.txt\` file.
`;
}
