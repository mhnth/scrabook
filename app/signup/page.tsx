import { SignUpForm } from './signup-form';

export default function SignUpPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <SignUpForm />;
}
