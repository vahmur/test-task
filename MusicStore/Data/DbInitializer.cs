using System;
using System.Linq;
using MusicStore.Models;

namespace MusicStore.Data
{
    public class DbInitializer
    {
        public static void Initialize(MusicStoreContext context)
        {
            context.Database.EnsureCreated();

            // Look for any students.
            if (context.Artists.Any())
            {
                return;   // DB has been seeded
            }


            var tracksBlack = new Track[] {
                new Track{TrackName="Enter Sandman"},
                new Track{TrackName="Sad but True"},
                new Track{TrackName="Holier Than Thou"},
                new Track{TrackName="The Unforgiven"},
                new Track{TrackName="Wherever I May Roam"},
                new Track{TrackName="Don't Tread on Me"},
                new Track{TrackName="Through the Never"},
                new Track{TrackName="Nothing Else Matters"},
                new Track{TrackName="Of Wolf and Man"},
                new Track{TrackName="The God That Failed"},
                new Track{TrackName="My Friend of Misery"},
                new Track{TrackName="The Struggle Within"},
            };
            var tracksMaster = new Track[] {
                new Track{TrackName="Battery"},
                new Track{TrackName="Master of Puppets"},
                new Track{TrackName="The Thing That Should Not Be"},
                new Track{TrackName="Welcome Home (Sanitarium)"},
                new Track{TrackName="Disposable Heroes"},
                new Track{TrackName="Leper Messiah"},
                new Track{TrackName="Orion"},
                new Track{TrackName="Damage, Inc."},
            };
            var tracksMersy = new Track[] {
                new Track{TrackName="Evil Has No Boundaries"},
                new Track{TrackName="The Antichrist"},
                new Track{TrackName="Die By the Sword"},
                new Track{TrackName="Fight Till Death"},
                new Track{TrackName="Metal Storm/Face the Slayer"},
                new Track{TrackName="Black Magic"},
                new Track{TrackName="Tormentor"},
                new Track{TrackName="The Final Command"},
                new Track{TrackName="Crionics"},
                new Track{TrackName="Show No Mercy"},
            };
            var tracksWarriors = new Track[] {
                new Track{TrackName="Call to Arms"},
                new Track{TrackName="The Fight for Freedom"},
                new Track{TrackName="Nessun Dorma"},
                new Track{TrackName="Valhalla"},
                new Track{TrackName="Swords in the Wind"},
                new Track{TrackName="An American Trilogy"},
                new Track{TrackName="The March"},
                new Track{TrackName="Warriors of the World United"},
                new Track{TrackName="Hand of Doom"},
                new Track{TrackName="House of Death"},
                new Track{TrackName="Fight Until We Die"}
            };

            var metallicaAlbums = new Album[] {
                new Album{AlbumName="Black Album", Tracks=tracksBlack},
                new Album{AlbumName="Master of puppets", Tracks=tracksMaster}
            };

            var slayerAlbums = new Album[] {
                new Album{AlbumName="Show No Mercy", Tracks=tracksMersy},
            };

            var manowarAlbums = new Album[] {
                new Album{AlbumName="Warriors Of The World", Tracks=tracksWarriors},
            };


            var artists = new Artist[]
            {
                new Artist{Name="Metallica", Albums=metallicaAlbums},
                new Artist{Name="Slayer", Albums=slayerAlbums},
                new Artist{Name="Manowar", Albums=manowarAlbums}
            };
            foreach (Artist s in artists)
            {
                context.Artists.Add(s);
            }
            context.SaveChanges();

            //var albums = new Album[]
            //{
            //    new Album{ArtistID=5, AlbumName="Black Album", AlbumID=1},
            //    new Album{ArtistID=5, AlbumName="Master of puppets", AlbumID=2},
            //    new Album{ArtistID=6, AlbumName="Show No Mercy", AlbumID=3},
            //    new Album{ArtistID=7, AlbumName="Warriors Of The World", AlbumID=4},
            //};
            //foreach (Album c in albums)
            //{
            //    context.Albums.Add(c);
            //}
            //context.SaveChanges();

            //var tracks = new Track[]
            //{
            //    new Track{AlbumID=1,TrackName="Enter Sandman"},
            //    new Track{AlbumID=1,TrackName="Sad but True"},
            //    new Track{AlbumID=1,TrackName="Holier Than Thou"},
            //    new Track{AlbumID=1,TrackName="The Unforgiven"},
            //    new Track{AlbumID=1,TrackName="Wherever I May Roam"},
            //    new Track{AlbumID=1,TrackName="Don't Tread on Me"},
            //    new Track{AlbumID=1,TrackName="Through the Never"},
            //    new Track{AlbumID=1,TrackName="Nothing Else Matters"},
            //    new Track{AlbumID=1,TrackName="Of Wolf and Man"},
            //    new Track{AlbumID=1,TrackName="The God That Failed"},
            //    new Track{AlbumID=1,TrackName="My Friend of Misery"},
            //    new Track{AlbumID=1,TrackName="The Struggle Within"},
            //    new Track{AlbumID=2,TrackName="Battery"},
            //    new Track{AlbumID=2,TrackName="Master of Puppets"},
            //    new Track{AlbumID=2,TrackName="The Thing That Should Not Be"},
            //    new Track{AlbumID=2,TrackName="Welcome Home (Sanitarium)"},
            //    new Track{AlbumID=2,TrackName="Disposable Heroes"},
            //    new Track{AlbumID=2,TrackName="Leper Messiah"},
            //    new Track{AlbumID=2,TrackName="Orion"},
            //    new Track{AlbumID=2,TrackName="Damage, Inc."},
            //    new Track{AlbumID=3,TrackName="Evil Has No Boundaries"},
            //    new Track{AlbumID=3,TrackName="The Antichrist"},
            //    new Track{AlbumID=3,TrackName="Die By the Sword"},
            //    new Track{AlbumID=3,TrackName="Fight Till Death"},
            //    new Track{AlbumID=3,TrackName="Metal Storm/Face the Slayer"},
            //    new Track{AlbumID=3,TrackName="Black Magic"},
            //    new Track{AlbumID=3,TrackName="Tormentor"},
            //    new Track{AlbumID=3,TrackName="The Final Command"},
            //    new Track{AlbumID=3,TrackName="Crionics"},
            //    new Track{AlbumID=3,TrackName="Show No Mercy"},
            //    new Track{AlbumID=4,TrackName="Call to Arms"},
            //    new Track{AlbumID=4,TrackName="The Fight for Freedom"},
            //    new Track{AlbumID=4,TrackName="Nessun Dorma"},
            //    new Track{AlbumID=4,TrackName="Valhalla"},
            //    new Track{AlbumID=4,TrackName="Swords in the Wind"},
            //    new Track{AlbumID=4,TrackName="An American Trilogy"},
            //    new Track{AlbumID=4,TrackName="The March"},
            //    new Track{AlbumID=4,TrackName="Warriors of the World United"},
            //    new Track{AlbumID=4,TrackName="Hand of Doom"},
            //    new Track{AlbumID=4,TrackName="House of Death"},
            //    new Track{AlbumID=4,TrackName="Fight Until We Die"}
            //};
            //foreach (Track e in tracks)
            //{
            //    context.Tracks.Add(e);
            //}
            //context.SaveChanges();
        }
    }
}
