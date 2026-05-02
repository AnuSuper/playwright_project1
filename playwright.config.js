
import { defineConfig } from '@playwright/test';
import { on } from 'events';

export default defineConfig({
  testDir: '.',
  timeout:40*1000,
  workers:2,
  
   
  expect:{
  timeout:3000,
  },
  reporter: 'html',
 
 
  use:{
    browserName:'chromium',
    headless:false,
    screenshot:'off',
    trace:'off'
  },
    

   
   
  
  
});

