using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicStore.Models
{
    public class StoreResponse
    {
        public int ArtistID { get; set; }
        public string ArtistName { get; set; }
        public int AlbumID { get; set; }
        public string AlbumName { get; set; }
        public int TrackID { get; set; }
        public string TrackName { get; set; }
    }
}
