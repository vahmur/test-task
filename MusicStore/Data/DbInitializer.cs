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

        }
    }
}
