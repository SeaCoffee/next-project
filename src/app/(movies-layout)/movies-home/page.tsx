import { redirect } from 'next/navigation';

export default function MoviesHomePage() {
  redirect('/movies-list');
}