import { defineStore } from "pinia";

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface Company {
  name: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}

type SortOrder = "asc" | "desc" | null;

const usersApi = import.meta.env.VITE_USERS_API;

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [] as User[],
    isLoading: false,
    error: null as string | null,

    // Search state
    searchQuery: "",
    appliedQuery: "",

    // Paginate state
    currentPage: 1,
    pageSize: 5,

    // Sorting state
    sortBy: null as keyof User | "company.name" | "address.city" | null,
    sortOrder: null as SortOrder,
  }),

  getters: {
    filteredUsers: (state): User[] => {
      if (!state.appliedQuery.trim()) return state.users;

      const query = state.appliedQuery.toLowerCase();
      return state.users.filter((user) =>
        JSON.stringify(user).toLowerCase().includes(query),
      );
    },

    sortedUsers(state): User[] {
      if (!state.sortBy || !state.sortOrder) return this.filteredUsers;

      const getValue = (user: User, key: string): any => {
        return key.split(".").reduce((acc: any, part) => acc?.[part], user);
      };

      const sorted = [...this.filteredUsers].sort((a, b) => {
        let aVal = getValue(a, state.sortBy!);
        let bVal = getValue(b, state.sortBy!);

        if (state.sortBy === "company") {
          aVal = getValue(a, state.sortBy!).name;
          bVal = getValue(b, state.sortBy!).name;
        }
        if (state.sortBy === "address") {
          aVal = getValue(a, state.sortBy!).city;
          bVal = getValue(b, state.sortBy!).city;
        }

        if (aVal == null) return 1;
        if (bVal == null) return -1;

        if (typeof aVal === "string" && typeof bVal === "string") {
          const res = aVal.localeCompare(bVal);
          return state.sortOrder === "asc" ? res : -res;
        }

        if (typeof aVal === "number" && typeof bVal === "number") {
          return state.sortOrder === "asc" ? aVal - bVal : bVal - aVal;
        }

        return 0;
      });

      return sorted;
    },

    paginatedUsers(state): User[] {
      const start = (state.currentPage - 1) * state.pageSize;
      return this.sortedUsers.slice(start, start + state.pageSize);
    },

    totalPages(state): number {
      return Math.ceil(this.filteredUsers.length / state.pageSize);
    },
  },

  actions: {
    async fetchUsers(): Promise<void> {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await fetch(usersApi);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const data: User[] = await response.json();
        this.users = data;
      } catch (err: any) {
        this.error = err?.message || "Unknown error";
      } finally {
        this.isLoading = false;
      }
    },

    applySearch() {
      this.appliedQuery = this.searchQuery.trim();
    },

    changePage(page: number) {
      this.currentPage = page;
    },

    changePageSize(size: number) {
      this.pageSize = size;
      this.currentPage = 1;
    },

    toggleSort(column: keyof User | "company.name" | "address.city") {
      if (this.sortBy === column) {
        // Toggle between "asc" and "desc" only
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortBy = column;
        this.sortOrder = "asc";
      }
      this.currentPage = 1; // Reset page on sort change
    },
  },
});
