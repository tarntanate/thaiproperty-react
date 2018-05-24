using System;

namespace Thaiproperty.Common
{

    public interface IUser
    {
        string firstName { get; set; }
        string lastName { get; set; }
        void GetName();
        void Add();
    }

    interface IAdmin
    {
        void DeletePost();
    }

    abstract public class AbstractUser<Any> : IUser {
        public abstract string firstName { get; set; }
        public abstract string lastName { get; set; }

        public abstract void Add();
        abstract public void DeletePost();
        public abstract void GetName();

        private bool IsValid(int i)
        {
            if (i>0)
                return true;
            return false;
        }
    }

    class User : AbstractUser<uint>
    {
        public User()
        {
        }

        public override string firstName { get; set; }
        public override string lastName { get; set; }

        public override void Add()
        {
            // throw new System.NotImplementedException();
        }

        public override void DeletePost()
        {
            // throw new NotImplementedException();
        }

        public override void GetName()
        {
            // throw new NotImplementedException();
        }

        public override string ToString()
        {
            return firstName + ' ' + lastName;
        }
    }


    class Test
    {
        IUser user1 = new User();
    }

}