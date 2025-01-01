<script lang="ts">
  import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
  import IconButton, { Icon } from '@smui/icon-button';
  import Drawer, { AppContent, Content, Header, Scrim } from '@smui/drawer';
  import List, { Item, Text, Graphic, Separator } from '@smui/list';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/authStore';
  import type { Snippet } from 'svelte';

  let { children } = $props<{ children: Snippet }>();
  let open = $state(false);

  type Route = {
    path: '/host' | '/profile' | '/guide';
    name: string;
    icon: string;
  };

  const routes: Route[] = [
    { path: '/host', name: 'Host', icon: 'home' },
    { path: '/profile', name: 'Profile', icon: 'person' },
    { path: '/guide', name: 'Guide', icon: 'map' }
  ];

  async function navigate(path: Route['path']) {
    await goto(path);
    open = false;
  }

  async function handleLogout() {
    await authStore.logout();
    await goto('/login');
    open = false;
  }
</script>

<div class="app-container">
  <Drawer variant="modal" bind:open>
    <Header>
      <Title>GuidePop</Title>
    </Header>
    <Content>
      <List>
        <!-- Navigation Items -->
        {#each routes as route}
          <Item
            href="javascript:void(0)"
            activated={page.url.pathname === route.path}
            onSMUIAction={() => navigate(route.path)}
          >
            <Graphic class="material-icons" aria-hidden="true">
              {route.icon}
            </Graphic>
            <Text>{route.name}</Text>
          </Item>
        {/each}

        <!-- Spacer to push logout to bottom -->
        <div class="spacer" />
        
        <Separator />
        
        <!-- Logout Button -->
        <Item
          href="javascript:void(0)"
          onSMUIAction={handleLogout}
        >
          <Graphic class="material-icons" aria-hidden="true">
            logout
          </Graphic>
          <Text>Logout</Text>
        </Item>
      </List>
    </Content>
  </Drawer>

  <Scrim />

  <AppContent class="app-content">
    <TopAppBar variant="static">
      <Row>
        <Section>
          <Title>GuidePop</Title>
        </Section>
        <Section align="end">
          <IconButton 
            class="material-icons"
            onclick={() => (open = !open)}
          >
            menu
          </IconButton>
        </Section>
      </Row>
    </TopAppBar>

    <main class="main-content">
      {@render children()}
    </main>
  </AppContent>
</div>

<style>
  .app-container {
    display: flex;
    height: 100vh;
  }

  :global(.app-content) {
    flex: auto;
    overflow: auto;
    position: relative;
    flex-grow: 1;
  }

  .main-content {
    padding: 1rem;
    margin-top: 64px;
  }

  /* Push logout to bottom of drawer */
  :global(.mdc-drawer__content) {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  :global(.mdc-list) {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .spacer {
    flex: 1;
  }
</style>