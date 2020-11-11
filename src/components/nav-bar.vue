<template>
  
      <q-list>
        <q-item-label header>Menu</q-item-label>
        <q-item clickable tag="a" target="_blank">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label><router-link to="/features">Features</router-link></q-item-label>
          </q-item-section>
        
        </q-item>
        <q-item clickable tag="a" target="_blank">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label><router-link to="/about">About</router-link></q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
</template>

  