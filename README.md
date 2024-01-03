# Setup domain alias for localhost in HOSTS file

### Windows:

Navigate to c:\windows\system32\drivers\etc\hosts\
Add line: 127.0.0.1 onlinecourse.local.dev:3000

### UNIX/ MacOS

Navigate to /etc/hosts\
Add line: 127.0.0.1 onlinecourse.local.dev:3000

# Running dashboard

Make sure following 2 lines are in .env along with rest of variables from .env.sample\
HTTPS=true\
HOST=onlinecourse.local.dev:3000

Run: npm start

Dashboard will open in browser with a security warning, refer to link for bypassing
this warning\
[TechniPages](https://www.technipages.com/google-chrome-bypass-your-connection-is-not-private-message 'TechniPages')
