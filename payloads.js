module.exports = [
  {
    notification: {
      title: 'Visit My Website',
      body: 'This is a sample notification message.',
      icon: './images/icons/apple-touch-icon.png',
      data: {
        url: process.env.SERVER_URL
      },
      actions: [
        {
          action: 'visit',
          title: 'Visit Website',
        },
        {
          action: 'no',
          title: 'No, Thanks!',
        },
      ]
    }
  },
  {
    notification: {
      title: 'Push notification demo',
      body: 'Click to return to application.',
      tag: 'demo',
      icon: './images/icons/apple-touch-icon.png',
      badge: './images/icons/apple-touch-icon.png',
      actions: [
        {
          action: 'yes',
          title: 'I ♥ this app!',
        },
        {
          action: 'no',
          title: 'I don\'t like this app',
        },
      ]
    }
  },
  {
    notification: {
      title: 'Say hello VietNamLab!',
      body: 'Hello VietNamLab!',
      icon: './images/icons/apple-touch-icon.png',
      badge: './images/icons/apple-touch-icon.png',
      data: {
        say: 'hello VietNamLab!'
      },
      actions: [
        {
          action: 'hello',
          title: 'Hello',
        },
        {
          action: 'vietnamlab',
          title: 'VietNamLab',
        },
      ]
    },
  }
]