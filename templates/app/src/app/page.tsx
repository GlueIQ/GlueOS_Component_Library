import { redirect } from 'next/navigation'

/**
 * Root page — redirect to the app's main dashboard.
 * Update this if the default landing route changes.
 */
export default function RootPage() {
  redirect('/__APP_SLUG__')
}
