# BS LIST:

- I BS'ed the part that shares messages between platforms

  - Specifically the database stuff... those queries are very inefficient
  - Structurally it's fine

- I BS'ed the webhook properties of the Channel table
  - I didn't really know what to do there?
    - We could have a table just for webhooks, but why?
    - We could concatenate all the data into one string, but that doesn't sound right...
