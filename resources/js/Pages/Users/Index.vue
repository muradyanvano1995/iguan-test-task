<template>
    <Head title="Users"/>
    <v-container>
        <div class="d-flex justify-space-between mb-8">
            <h1 class="text-h5">Users</h1>

            <div class="d-flex ga-2">
                <CreateButton/>
            </div>
        </div>
        <v-table v-if="users.total > 0" density="compact">
            <thead>
            <tr>
                <th class="text-left font-weight-bold">
                    Name
                </th>
                <th class="text-left font-weight-bold">
                    Email
                </th>
                <th class="text-left font-weight-bold">
                    Created at
                </th>
                <th class="text-left font-weight-bold">
                    Address
                </th>
                <th class="text-left font-weight-bold">
                    Phone number
                </th>
                <th class="text-left font-weight-bold"/>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="user in users.data"
                :key="user.id"
            >
                <td class="font-weight-medium text-primary py-4">{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.created_at }}</td>
                <td>{{ user.details.address }}</td>
                <td>{{ user.details.phone_number }}</td>
                <td>
                    <EditButton :user="user"/>
                    <DeleteButton :user-id="user.id"/>
                </td>
            </tr>
            </tbody>
        </v-table>
        <v-pagination
            v-if="users.last_page > 1"
            v-model="page"
            :length="users.last_page"
            :total-visible="7"
            active-color="primary"
            class="mt-8"
            rounded="circle"
            @update:model-value="visit"
        />
    </v-container>
</template>
<script>
import DashboardLayout from "@/Components/Layouts/DashboardLayout.vue";
import {Head} from "@inertiajs/vue3";
import CreateButton from "@/Pages/Users/Partials/CreateButton.vue";
import EditButton from "@/Pages/Users/Partials/EditButton.vue";
import DeleteButton from "@/Pages/Users/Partials/DeleteButton.vue";

export default {
    components: {DeleteButton, EditButton, CreateButton, Head},
    layout: DashboardLayout,
    props: {
        users: Object,
    },
    data() {
        return {
            page: this.users.current_page
        }
    },
    methods: {
        visit(page) {
            this.$inertia.visit(route('users.index', {page}))
        }
    }
}
</script>
