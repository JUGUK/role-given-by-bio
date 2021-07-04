client.on('presenceUpdate', async (oldm, newm) => {
    try {
    let date = new Date()
    let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      if (oldm.member.user.bot || newm.member.user.bot) return;
  
      let olds = oldm.activities[0].state;
      let news = newm.activities[0].state;
      if (olds === news) return;
      if (config.status.anystatus === false) {
      if (news.includes(config.status.statustext) && !newm.member.roles.cache.has(config.status.roletogiveid)) {
          newm.member.roles.add(config.status.roletogiveid).then(async d => {
            if (config.options.consolelogs === true) console.log(`[CONSOLE LOG] (ROLE ADDED) => ${newm.user.tag} {${time}}`)
          }).catch(() => {})
  
      } else if (!news.includes(config.status.statustext) && newm.member.roles.cache.has(config.status.roletogiveid)) {
          newm.member.roles.remove(config.status.roletogiveid).catch(() => {})
          if (config.options.consolelogs === true) console.log(`[CONSOLE LOG] (ROLE REMOVED) => ${newm.user.tag} {${time}}`)
      } else if (!newm.activities[0].state && newm.member.roles.cache.has(config.status.roletogiveid)) {
          newm.member.roles.remove(config.status.roletogiveid).catch(() => {})
          if (config.options.consolelogs === true) console.log(`[CONSOLE LOG] (ROLE REMOVED) => ${newm.user.tag} {${time}}`)
      }
    } else if (config.status.anystatus === true) {
      if (news && olds) {
        newm.member.roles.add(config.status.roletogiveid).then(async d => {
          if (config.options.consolelogs === true) console.log(`[CONSOLE LOG] ANY STATUS (ROLE ADDED) => ${newm.user.tag} {${time}}`)
        }).catch(() => {})
      }
    }
    } catch (e) {}
  })