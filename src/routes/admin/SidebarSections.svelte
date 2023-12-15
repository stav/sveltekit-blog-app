<script>
  import { page } from "$app/stores"

  import SvgIcon from "$lib/SvgIcons.svelte"

  export let staticSidebar = true

  let isDesktop = staticSidebar

  const numClients = $page.data.clients.length
  const numJobs = $page.data.jobs.length

  let items = [
    { href: "/", icon: "outline/home", label: "Frontend" },
    { href: "/admin/clients", icon: "clients", label: "Clients" },
  ]
  if (numClients > 0) {
    items.push({ href: "/admin/jobs", icon: "wrench", label: "Jobs" })
  }
  if (numJobs > 0) {
    items.push({ href: "/admin/costs", icon: "currency", label: "Costs" })
    items.push({ href: "/admin/payments", icon: "banknotes", label: "Payments" })
  }
  if (numClients > 0) {
    items.push({ href: "/admin/export", icon: "download", label: "Import / Export" })
  }
  const adminItems = [
    { href: "/admin/users", icon: "users", label: "Users" },
    { href: "/admin/tags", icon: "tags", label: "Tags" },
    { href: "/admin/posts", icon: "posts", label: "Posts" },
    { href: "/admin/comments", icon: "comments", label: "Comments" },
  ]
  if ($page.data.user.role === 'admin') {
    items.push(...adminItems)
  }
</script>

{#each items as item}
  <a
    href={item.href}
    class="{isDesktop
      ? 'text-white hover:bg-sky-500'
      : 'text-gray-600 hover:bg-gray-100'}  group flex items-center px-2 py-2 text-sm font-medium rounded-md"
  >
    <SvgIcon
      icon={item.icon}
      htmlClass="mr-3 flex-shrink-0 h-6 w-6 {isDesktop
        ? 'text-gray-200 '
        : 'text-gray-400 '}"
    />
    {item.label}
  </a>
{/each}
