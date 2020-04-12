export default function formatH3Tag(text: string) {
  const [name, ...args] = text.split('※').map((str) => str.trim());

  if (!name) {
    throw new Error('Invaild h3 format:name');
  }

  const id = parseInt(name.replace(/[^0-9\\.]/g, ''));

  if (!id) {
    throw new Error('Invaild h3 format:id');
  }

  // const contactRelations: { id: number; text: string }[] = args.map((str) => {
  //   const match = str.match(/(\d+(?:[、|と])*?)/g);
  //   // const match = str.match(/^感染者(?:[、|と](\d+))+?(?:の)(.*)?/i);

  //   if (!match) {
  //     return {
  //       id: 10,
  //       text: '',
  //     };
  //   }

  //   console.log('match', match);
  //   return {
  //     id,
  //     text: '',
  //   };
  // });

  return {
    id,
    name,
    // contactRelations,
  };
}
