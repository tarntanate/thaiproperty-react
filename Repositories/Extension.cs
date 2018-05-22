using System;
using System.Collections.Generic;
using System.Linq;

namespace Thaiproperty.Repositories
{
    public static class Extension
    {
        public static Nullable<int> AverageOrNull(this IEnumerable<int> source)
        {
            if (source.Any())
                return (int)source.Average();
            else
                return null;
        }
    }
}