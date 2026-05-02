
import { defineConfig, devices } from '@playwright/test';
import { on } from 'events';

export default defineConfig({
  testDir: '.',
  timeout:40*1000,
  retries:1,
   
  expect:{
  timeout:3000,
  },
  reporter: 'html',
 
 projects:[
  {
name:'Safari',
  use:{
    browserName:'webkit',
    headless:false,
    screenshot:'off',
    trace:'off',
    video:'retain-on-failure',
     //viewport:{height:730,width:420}
     ...devices['BlackBerry Z30 landscape']
  }
},{
  name:'Google Chrome',
  use:{
    browserName:'chromium',
    headless:false,
    screenshot:'off',
    trace:'off',
   
  }

},
    

]  
   
  
  
});

