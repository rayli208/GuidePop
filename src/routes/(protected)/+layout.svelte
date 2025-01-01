<script lang="ts">
    import { onMount } from 'svelte';
    import { user } from '$lib/stores/authStore';
    import { goto } from '$app/navigation';
    import { auth } from '$lib/firebase';
    import { authStore } from '$lib/stores/authStore';
    import { browser } from '$app/environment';

    onMount(() => {
        if (browser) {
            const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
                if (firebaseUser) {
                    await authStore.loadUser(firebaseUser.uid);
                } else {
                    user.set(null);
                    goto('/login');
                }
            });

            return unsubscribe;
        }
    });
</script>

<nav class="bg-gray-800 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center space-x-4">
            <a href="/host" class="hover:text-gray-300">Host</a>
            <a href="/profile" class="hover:text-gray-300">Profile</a>
            <a href="/guide" class="hover:text-gray-300">Guide</a>
        </div>
        {#if $user}
            <div class="flex items-center space-x-4">
                <span>{$user.displayName}</span>
                <img src={$user.photoURL} alt="Profile" class="w-8 h-8 rounded-full"/>
                <a href="/logout" class="hover:text-gray-300">Logout</a>
            </div>
        {/if}
    </div>
</nav>

<main class="container mx-auto p-4">
    <slot />
</main>