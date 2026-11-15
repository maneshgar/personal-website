---
redirect_from: /writing/2010/distributed-file-system/
title: "Distributed File System"
tags: [projects]
description: "A file manager that pools spare storage across machines into one large, location-transparent store."
project_where: University of Isfahan
project_period: 2007 – 2010
---

This project was the design and implementation of a file manager that stores
documents, media and other data across **distributed resources**. The idea is to
take advantage of scattered storage, used or unused, and gather it under one
uniform system to get a very large storage capacity.

The file system had two key features:

- **Location independence:** files aren't tied to a particular machine.
- **Transparency:** users never need to know the physical directory or real
  location of their data.
