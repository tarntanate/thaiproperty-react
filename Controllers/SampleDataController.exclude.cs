using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.NodeServices;

namespace Thaiproperty.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private static string[] Summaries = new[]
        {
            "ร้อน", "หนาว", "ชิวๆ", "เย็นสบาย", "อบอุ่น", "ร้อน", "Balmy", "ร้อนจัด", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts(int startDateIndex)
        {
            Task.Delay(400).Wait();
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index + startDateIndex).ToString("d"),
                TemperatureC = rng.Next(-10, 45),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

         // https://blogs.msdn.microsoft.com/webdev/2017/02/14/building-single-page-applications-on-asp-net-core-with-javascriptservices/
        [HttpGet("[action]")]
        public async Task<IActionResult> About([FromServices] INodeServices nodeServices) 
        {
            // required services.AddNodeServices(); in Startup.cs
            ViewData["ResultFromNode"] = await nodeServices.InvokeAsync<string>("ClientApp/ServerApp/myNodeModule.js"); 
            return View(); 
        }


        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }
    }
}
