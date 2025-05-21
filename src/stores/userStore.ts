import { defineStore } from 'pinia';

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

type SortOrder = 'asc' | 'desc' | null;

const usersApi = import.meta.env.VITE_USERS_API;

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
    isLoading: false,
    error: null as string | null,

    searchQuery: '',
    appliedQuery: '',

    currentPage: 1,
    pageSize: 5,

    sortBy: null as keyof User | 'company.name' | 'address.city' | null,
    sortOrder: null as SortOrder,
  }),

  getters: {
    filteredUsers: (state): User[] => {
      if (!state.appliedQuery.trim()) return state.users;

      const query = state.appliedQuery.toLowerCase();
      return state.users.filter((user) => JSON.stringify(user).toLowerCase().includes(query));
    },

    sortedUsers(): User[] {
      const list = this.filteredUsers;
      const { sortBy, sortOrder } = this;

      if (!sortBy || !sortOrder) return list;

      const getValue = (user: User, key: string): any =>
        key.split('.').reduce((acc: any, part) => acc?.[part], user);

      return [...list].sort((a, b) => {
        let aVal = getValue(a, sortBy);
        let bVal = getValue(b, sortBy);

        if (sortBy === 'company') {
          aVal = getValue(a, sortBy).name;
          bVal = getValue(b, sortBy).name;
        }
        if (sortBy === 'address') {
          aVal = getValue(a, sortBy).city;
          bVal = getValue(b, sortBy).city;
        }

        if (aVal == null) return 1;
        if (bVal == null) return -1;

        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
        }

        return 0;
      });
    },

    paginatedUsers(): User[] {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.sortedUsers.slice(start, start + this.pageSize);
    },

    totalPages(): number {
      return Math.ceil(this.filteredUsers.length / this.pageSize);
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
        this.error = err?.message || 'Unknown error';
      } finally {
        this.isLoading = false;
      }
    },

    applySearch() {
      this.appliedQuery = this.searchQuery.trim();
      this.currentPage = 1;
    },

    changePage(page: number) {
      this.currentPage = page;
    },

    changePageSize(size: number) {
      this.pageSize = size;
      this.currentPage = 1;
    },

    toggleSort(column: keyof User | 'company.name' | 'address.city') {
      if (this.sortBy === column) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortBy = column;
        this.sortOrder = 'asc';
      }
      this.currentPage = 1;
    },
  },
});
