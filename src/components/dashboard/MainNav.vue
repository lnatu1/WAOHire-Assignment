<template>
  <nav class="flex h-full flex-col justify-between font-medium">
    <div>
      <div class="flex items-center gap-4">
        <img
          class="size-12"
          src="https://avatar.iran.liara.run/public/boy"
          alt=""
        >
        <div>Admin</div>
      </div>
      <ul class="mt-4">
        <li>
          <RouterLink
            to="/"
            class="hover:bg-p-1 flex cursor-pointer items-center gap-2 rounded-md p-2 duration-200 hover:text-white"
            exact-active-class="bg-p-1 text-white"
          >
            <span class="material-icons !text-3xl">apps</span>
            <span>Dashboard</span>
          </RouterLink>
        </li>
        <li class="mt-2">
          <RouterLink
            to="/users"
            class="hover:bg-p-1 flex cursor-pointer items-center gap-2 rounded-md p-2 duration-200 hover:text-white"
            exact-active-class="bg-p-1 text-white"
          >
            <span class="material-icons-outlined !text-3xl">group</span>
            <span>Users</span>
          </RouterLink>
        </li>
      </ul>
    </div>

    <ul>
      <li>
        <div
          class="hover:bg-p-1 flex cursor-pointer items-center gap-2 rounded-md p-2 duration-200 hover:text-white"
        >
          <span class="material-icons-outlined !text-3xl">settings</span>
          <span>Settings</span>
        </div>
      </li>
      <li>
        <div
          class="hover:bg-p-1 flex cursor-pointer items-center gap-2 rounded-md p-2 duration-200 hover:text-white"
        >
          <span class="material-icons-outlined !text-3xl">logout</span>
          <span>Logout</span>
        </div>
      </li>
    </ul>
  </nav>
</template>
