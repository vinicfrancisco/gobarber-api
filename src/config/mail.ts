interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'vinicfrancisco@gmail.com',
      name: 'Vinícius Catafesta Francisco',
    },
  },
} as IMailConfig;
