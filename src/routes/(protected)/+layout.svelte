<script lang="ts">
    import { onMount } from 'svelte';
    import { user } from '$lib/stores/authStore';
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
    import { auth } from '$lib/firebase';
    import { authStore } from '$lib/stores/authStore';
    import { browser } from '$app/environment';
    import Nav from '$lib/components/Nav.svelte';

    let { children } = $props();

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

<Nav>
    {@render children()}
</Nav>