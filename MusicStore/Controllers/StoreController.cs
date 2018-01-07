using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicStore.Data;
using MusicStore.Models;

namespace MusicStore.Controllers
{
    [Produces("application/json")]
    [Route("api/Store")]
    public class StoreController : Controller
    {
        private readonly MusicStoreContext _context;

        public StoreController(MusicStoreContext context)
        {
            _context = context;
        }

        // GET: api/Sorted
        [HttpGet]
        public List<StoreResponse> GetSorted(string orderBy, string order, string filterBy, string filterValue, int pageSize, int page)
        {

            int recordCount = 0;

            var data = (from artist in _context.Artists
                           join albums in _context.Albums on artist.ArtistID equals albums.ArtistID
                           join tracks in _context.Tracks on albums.AlbumID equals tracks.AlbumID
                           select new StoreResponse {
                               ArtistID = artist.ArtistID,
                               ArtistName = artist.Name,
                               AlbumID = albums.AlbumID,
                               AlbumName = albums.AlbumName,
                               TrackID = tracks.TrackID,
                               TrackName = tracks.TrackName
                           });

            /*
             * Filtering
             */
            if (!String.IsNullOrEmpty(filterBy) && !String.IsNullOrEmpty(filterValue))
            {
                switch (filterBy)
                {
                    case "ArtistName":
                        data = data.Where(s => s.ArtistName.Contains(filterValue));
                        break;
                    case "AlbumName":
                        data = data.Where(s => s.AlbumName.Contains(filterValue));
                        break;
                    case "TrackName":
                        data = data.Where(s => s.TrackName.Contains(filterValue));
                        break;
                }
            }

            /*
             * Ordering
             */
            if (!String.IsNullOrEmpty(orderBy)) {
                switch (orderBy)
                {
                    case "ArtistName":
                        if (String.Equals(order, "desc"))
                        {
                            data = data.OrderByDescending(s => s.ArtistName);
                        }
                        else
                        {
                            data = data.OrderBy(s => s.ArtistName);
                        }
                        break;
                    case "AlbumName":
                        if (String.Equals(order, "desc"))
                        {
                            data = data.OrderByDescending(s => s.AlbumName);
                        }
                        else
                        {
                            data = data.OrderBy(s => s.AlbumName);
                        }
                        break;
                    case "TrackName":
                        if (String.Equals(order, "desc"))
                        {
                            data = data.OrderByDescending(s => s.TrackName);
                        }
                        else
                        {
                            data = data.OrderBy(s => s.TrackName);
                        }
                        break;
                }
            }

            recordCount = data.Count();

            /*
             * Pages
             */
            if (pageSize > 0 && page > 0)
            {
                data = data.Skip(pageSize * (page - 1))
                    .Take(pageSize);
            }

            return data.ToList();

        }
    }
}