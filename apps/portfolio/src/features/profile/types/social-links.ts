export type SocialLink = {
  /** Icon identifier from Icons component or lucide-react. */
  icon: 'github' | 'instagram' | 'threads' | 'bento';
  title: string;
  /** Optional handle/username or subtitle displayed under the title. */
  description?: string;
  /** External profile URL opened when the item is clicked. */
  href: string;
};
