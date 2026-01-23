import { createComment } from "@/http/create-comment";
import { getIssue } from "@/http/get-issue";
import { authClient } from "@/lib/auth-client";
import { MoveLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { IssueDetails } from "./issue-details";

interface IssuePageProps {
  params: Promise<{ id: string }>;
}

const statusLabels = {
  backlog: "Backlog",
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
} as const;

export const generateMetadata = async ({
  params,
}: IssuePageProps): Promise<Metadata> => {
  const { id } = await params;

  const issue = await getIssue({ id });

  return {
    title: `Issue ${issue.title}`,
  };
};

export default async function IssuePage({ params }: IssuePageProps) {
  const { id } = await params;

  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  const issue = await getIssue({ id });

  const isAuthenticated = !!session?.user;

  async function handleCreateComment(text: string) {
    "use server";

    await createComment({ issueId: id, text });
  }

  return (
    <main className="max-w-[900px] mx-auto w-full flex flex-col gap-4 p-6 bg-navy-800 border-[0.5px] border-navy-500 rounded-xl">
      <Link
        href="/"
        className="flex items-center gap-2 text-navy-200 hover:text-navy-100"
      >
        <MoveLeftIcon className="size-4" />
        <span className="text-xs">Back to board</span>
      </Link>

      <IssueDetails issueId={id} />
    </main>
  );
}
