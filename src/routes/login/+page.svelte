<script lang="ts">
    import { authStore, user } from '$lib/stores/authStore';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    onMount(() => {
        if ($user) {
            goto('/host');
        }
    });

    async function handleLogin() {
        try {
            await authStore.signInWithGoogle();
            goto('/host');
        } catch (error) {
            console.error('Login error:', error);
        }
    }
</script>

<div class="flex justify-center items-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-4">Welcome to GuidePoP</h1>
        <button
            on:click={handleLogin}
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
            Sign in with Google
        </button>
    </div>
</div>