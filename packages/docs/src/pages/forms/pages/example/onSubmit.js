let counter = 0;

const onSubmit = values => {
  console.log(values);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      counter += 1;

      if (counter % 2 === 0) {
        return reject({
          error: true,
          data: { message: 'Sign up failed', code: '001' },
        });
      }

      return resolve();
    }, 1000);
  });
};

export default onSubmit;
