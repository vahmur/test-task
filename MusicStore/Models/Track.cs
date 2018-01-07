using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicStore.Models
{
    public class Track
    {
        public int TrackID { get; set; }
        public string TrackName { get; set; }
        public int AlbumID { get; set; }
        //public Album Album { get; set; }
    }
}
