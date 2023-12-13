<template>
    <main class="mx-auto w-min md:w-10/12 flex flex-col gap-4">
        <h1 class="text-xl">Settings</h1>
        <UDivider />
        <div>
            <h2>Email</h2>
            <UInput
                type="email"
                :placeholder="user?.email"
                v-model="email"
                class="w-96 mb-3"
            />
            <UButton @click="updateEmail" class="mt-1">Change Email</UButton>
        </div>
        <UDivider />
        <div>
            <h2>Password</h2>
            <UInput
                type="password"
                placeholder="New password"
                v-model="password"
                class="w-96 mb-3"
            />
            <UInput
                type="password"
                placeholder="Confirm new password"
                v-model="confirmPassword"
                class="w-96 mb-3"
            />
            <UButton @click="resetPassword" class="mt-1"
                >Change Password</UButton
            >
        </div>
    </main>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const { auth } = useSupabaseClient();
const toast = useToast();
const email = ref(user.value?.email);
const password = ref("");
const confirmPassword = ref("");

const updateEmail = async () => {
    const { error } = await auth.updateUser({
        email: email.value,
    });
    if (error) {
        toast.add({
            title: "Error",
            description: error.message,
            icon: "i-heroicons-exclamation-circle",
            timeout: 5000,
        });
        return;
    } else {
        toast.add({
            title: "Success",
            description: "Email change request sent, check your inboxes to confirm",
            icon: "i-heroicons-envelope",
            timeout: 5000,
        });
    }
};

const resetPassword = async () => {
    if (password.value != confirmPassword.value) {
        toast.add({
            title: "Error",
            description: "Passwords do not match",
            icon: "i-heroicons-exclamation-circle",
            timeout: 5000,
        });
        return;
    }
    const { error } = await auth.updateUser({
        password: password.value,
    });
    if (error) {
        toast.add({
            title: "Error",
            description: error.message,
            icon: "i-heroicons-exclamation-circle",
            timeout: 5000,
        });
        return
    } else {
        navigateTo("/login");
    }
};
</script>
