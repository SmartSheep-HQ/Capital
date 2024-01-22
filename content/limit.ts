const isUser = ({ session }: { session: any }) => session?.data.id != null;
const allowUser: any = {
  operation: {
    create: isUser,
    update: isUser,
    delete: isUser,
  },
};

const isEditor = ({ session }: { session: any }) => session?.data.isEditor || session?.data.isAdmin;
const allowEditor: any = {
  operation: {
    create: isEditor,
    update: isEditor,
    delete: isEditor,
  },
};

const isAdmin = ({ session }: { session: any }) => session?.data.isAdmin;
const allowAdmin: any = {
  operation: {
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
};

export { isUser, isAdmin, isEditor, allowUser, allowAdmin, allowEditor };
