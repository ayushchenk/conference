﻿using MediatR;
using System.ComponentModel.DataAnnotations;

namespace ConferenceManager.Core.Conferences.Join
{
    public class JoinConferenceCommand : IRequest
    {
        [Required]
        [MaxLength(20)]
        public string Code { get; set; } = null!;
    }
}