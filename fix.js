// Fix.js - Overrides for broken functionality
// Loaded after main script to fix join buttons, help share, and activities layout

// Fix 1: Override openClubPopup to use in-page societyFallback modal
const _origOpenClubPopup = typeof window.openClubPopup === 'function' ? window.openClubPopup : null;
const _origOpenMySocietiesProfile = typeof window.openMySocietiesProfile === 'function' ? window.openMySocietiesProfile : null;

function closeSocietyFallback(){document.getElementById('societyFallback').classList.remove('show');document.getElementById('societyFallback').innerHTML='';document.body.style.overflow=''}

window.openClubPopup = function(encoded,focusJoin){
  var club = JSON.parse(decodeURIComponent(encoded));
  var fb = document.getElementById('societyFallback');
  if(!fb) { if(_origOpenClubPopup) return _origOpenClubPopup(encoded,focusJoin); return; }
  
  var calHtml = (club.calendar||[]).map(function(i){
    return '<div class="society-calendar-item"><strong>'+i.day+'</strong><span>'+i.event+'</span><span class="cal-badge">Upcoming</span></div>';
  }).join('') || '<div class="society-calendar-item"><strong>Weekly</strong><span>Open meetings and member sessions</span><span class="cal-badge">Recurring</span></div>';
  
  if(focusJoin){
    fb.innerHTML = '<button class="society-fallback__close" onclick="closeSocietyFallback()">&times;</button>' +
    '<div class="society-fallback__panel">' +
    '<div class="society-hero" style="background-image:url(\'' + club.hero + '\')"><h1>Join ' + club.title + '</h1></div>' +
    '<div class="society-body">' +
    '<div class="society-card"><span class="society-pill"><i class="fas fa-shield-alt"></i> Join Verification</span>' +
    '<p style="margin-top:12px;line-height:1.8;color:#64748b">Enter your student email and motivation to submit your membership request.</p>' +
    '<div class="society-form">' +
    '<div class="society-field"><label>Student Email</label><input id="societyEmail" type="email" placeholder="student@uft.edu"></div>' +
    '<div class="society-field"><label>Motivation</label><input id="societyReason" type="text" placeholder="Why do you want to join?"></div>' +
    '<div class="society-action-row">' +
    '<button class="btn btn-primary" onclick="addSocietyMembership({title:\''+club.title+'\',hero:\''+club.hero+'\',summary:\''+club.summary+'\',calendar:'+JSON.stringify(club.calendar||[])+'});closeSocietyFallback();openMySocietiesProfile()"><i class="fas fa-plus"></i> Join society</button>' +
    '<button class="btn btn-soft" onclick="closeSocietyFallback()"><i class="fas fa-xmark"></i> Cancel</button>' +
    '</div></div></div>' +
    '<div class="society-grid"><div class="society-card"><h3><i class="fas fa-gift" style="color:var(--primary)"></i> What you get</h3>' +
    '<div style="display:grid;gap:10px;margin-top:12px">' +
    '<div class="society-feature"><i class="fas fa-check-circle"></i><span>Access to meetings and exclusive events</span></div>' +
    '<div class="society-feature"><i class="fas fa-check-circle"></i><span>Profile visibility in My Societies</span></div>' +
    '<div class="society-feature"><i class="fas fa-check-circle"></i><span>Calendar reminders and tracking</span></div>' +
    '</div></div>' +
    '<div class="society-card"><h3><i class="fas fa-calendar-alt" style="color:var(--primary)"></i> Schedule</h3>' + calHtml + '</div>' +
    '</div></div></div>';
  } else {
    fb.innerHTML = '<button class="society-fallback__close" onclick="closeSocietyFallback()">&times;</button>' +
    '<div class="society-fallback__panel">' +
    '<div class="society-hero" style="background-image:url(\'' + club.hero + '\')"><h1>' + club.title + '</h1></div>' +
    '<div class="society-body">' +
    '<div class="society-card"><span class="society-pill"><i class="fas fa-star"></i> Society Profile</span>' +
    '<p style="margin-top:12px;line-height:1.8;color:#475569">' + club.detail + '</p>' +
    '<div class="society-action-row">' +
    '<button class="btn btn-primary" onclick="closeSocietyFallback();setTimeout(function(){openClubPopup(\''+encodeURIComponent(JSON.stringify(club))+'\',true)},200)"><i class="fas fa-plus"></i> Join this society</button>' +
    '<button class="btn btn-soft" onclick="closeSocietyFallback()"><i class="fas fa-xmark"></i> Close</button>' +
    '<button class="btn btn-soft" onclick="closeSocietyFallback();setTimeout(function(){openMySocietiesProfile()},200)"><i class="fas fa-id-card"></i> My Societies</button>' +
    '</div></div>' +
    '<div class="society-grid"><div class="society-card"><h3><i class="fas fa-info-circle" style="color:var(--primary)"></i> Club Profile</h3>' +
    '<p style="color:#64748b;line-height:1.8">' + club.profile + '</p>' +
    '<div style="margin-top:14px"><strong style="color:var(--secondary)">Focus</strong><p style="color:#64748b;line-height:1.7;margin-top:4px">' + club.focus + '</p></div>' +
    '<div style="margin-top:14px"><strong style="color:var(--secondary)">Activities</strong><p style="color:#64748b;line-height:1.7;margin-top:4px">' + club.activities + '</p></div>' +
    '</div>' +
    '<div class="society-card"><h3><i class="fas fa-calendar-alt" style="color:var(--primary)"></i> Weekly Schedule</h3>' + calHtml + '</div>' +
    '</div>' +
    '<div class="society-gallery"><div class="society-gallery-item"><img src="' + club.hero + '" alt="' + club.title + '"><div class="overlay">' + club.detail + '</div></div>' +
    '<div class="society-gallery-item"><img src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200" alt="Members"><div class="overlay">Members, events, and society life</div></div></div>' +
    '</div></div>';
  }
  fb.classList.add('show');
  document.body.style.overflow='hidden';
  fb.onclick=function(e){if(e.target===fb)closeSocietyFallback()};
};

// Fix 2: Override openMySocietiesProfile to use in-page modal
window.openMySocietiesProfile = function(){
  var s = getSocieties();
  var fb = document.getElementById('societyFallback');
  if(!fb) { if(_origOpenMySocietiesProfile) return _origOpenMySocietiesProfile(); return; }
  
  var calItems = s.length ? s.flatMap(function(item){
    return (item.calendar||[]).map(function(ev){
      return '<div class="society-calendar-item"><strong>'+item.title+'</strong><span>'+ev.event+'</span><span class="cal-badge">'+ev.day+'</span></div>';
    });
  }).join('') : '<div style="text-align:center;padding:40px;color:#94a3b8"><i class="fas fa-calendar" style="font-size:2rem;margin-bottom:10px;display:block"></i><h3>No calendar items yet</h3><p>Your joined societies will populate the calendar automatically.</p></div>';
  
  var socCards = s.length ? s.map(function(x){
    return '<div class="society-card" style="margin-bottom:0;overflow:hidden;padding:0"><img src="'+x.hero+'" alt="'+x.title+'" style="width:100%;height:180px;object-fit:cover;display:block"><div style="padding:16px"><h4 style="color:var(--secondary);margin:0 0 6px">'+x.title+'</h4><p style="color:#64748b;font-size:.88rem;margin:0">'+x.summary+'</p><div style="color:#94a3b8;font-size:.8rem;margin-top:8px">Joined: '+new Date(x.joinedAt).toLocaleDateString()+'</div></div></div>';
  }).join('') : '<div style="text-align:center;padding:50px;color:#94a3b8"><i class="fas fa-users" style="font-size:3rem;margin-bottom:14px;display:block;color:#e2e8f0"></i><h3 style="color:var(--secondary)">No societies joined yet</h3><p>Go to Clubs & Societies to find and join your first society.</p><button class="btn btn-primary" style="margin-top:16px" onclick="closeSocietyFallback()"><i class="fas fa-users"></i> Browse Societies</button></div>';
  
  fb.innerHTML = '<button class="society-fallback__close" onclick="closeSocietyFallback()">&times;</button>' +
  '<div class="society-fallback__panel">' +
  '<div style="background:linear-gradient(135deg,var(--secondary),#001d3a);padding:32px;color:#fff;border-radius:20px 20px 0 0"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px"><div><h1 style="margin:0;font-size:1.8rem">My Societies Dashboard</h1><p style="margin:6px 0 0;opacity:.85">Track your societies, calendar, and support.</p></div><span style="background:var(--primary);padding:6px 16px;border-radius:999px;font-weight:800">'+s.length+' joined</span></div></div>' +
  '<div class="society-body">' +
  '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-bottom:24px">' +
  '<div class="society-card" style="text-align:center;margin-bottom:0"><strong style="display:block;font-size:2rem;color:var(--secondary)">'+s.length+'</strong><span style="font-size:.78rem;text-transform:uppercase;color:#64748b;letter-spacing:1px">Societies</span></div>' +
  '<div class="society-card" style="text-align:center;margin-bottom:0"><strong style="display:block;font-size:2rem;color:var(--secondary)">'+s.reduce(function(a,si){return a+(si.calendar||[]).length},0)+'</strong><span style="font-size:.78rem;text-transform:uppercase;color:#64748b;letter-spacing:1px">Calendar Events</span></div>' +
  '<div class="society-card" style="text-align:center;margin-bottom:0"><strong style="display:block;font-size:2rem;color:var(--secondary)">'+(s.length?new Date(s[s.length-1].joinedAt).toLocaleDateString():'-')+'</strong><span style="font-size:.78rem;text-transform:uppercase;color:#64748b;letter-spacing:1px">Latest Join</span></div>' +
  '</div>' +
  '<h3 style="color:var(--secondary);margin-bottom:14px"><i class="fas fa-users" style="color:var(--primary)"></i> My Memberships</h3>' +
  '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px;margin-bottom:24px">'+socCards+'</div>' +
  '<h3 style="color:var(--secondary);margin-bottom:14px"><i class="fas fa-calendar-alt" style="color:var(--primary)"></i> My Calendar</h3>' +
  '<div class="society-card" style="margin-bottom:0">'+calItems+'</div>' +
  '<div class="society-card" style="margin-top:20px;background:linear-gradient(135deg,#fff7ed,#fff);border:1px solid #fed7aa"><h3 style="color:var(--secondary);margin-bottom:8px"><i class="fas fa-life-ring" style="color:var(--primary)"></i> Need Help?</h3><p style="color:#64748b;line-height:1.7">Contact Student Central for membership questions.</p><div class="society-action-row"><a class="btn btn-primary" href="mailto:studentservices@uft.edu"><i class="fas fa-envelope"></i> Email Support</a><button class="btn btn-soft" onclick="closeSocietyFallback()"><i class="fas fa-xmark"></i> Close</button></div></div>' +
  '</div></div>';
  fb.classList.add('show');
  document.body.style.overflow='hidden';
  fb.onclick=function(e){if(e.target===fb)closeSocietyFallback()};
};

// Fix 3: After render, fix help section share links and activities text wrapping
(function(){
  var observer = new MutationObserver(function(){
    // Fix help share links
    var helpSection = document.querySelector('[id="help"]');
    if(helpSection){
      var shareLinks = helpSection.querySelectorAll('a.btn-soft[href="javascript:;"]');
      if(shareLinks.length >= 3){
        shareLinks[0].href = 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fuft.edu';
        shareLinks[0].setAttribute('target','_blank');
        shareLinks[1].href = 'https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fuft.edu';
        shareLinks[1].setAttribute('target','_blank');
        shareLinks[2].href = 'mailto:?subject=UFT Help & Support&body=Check out the UFT Help page: https://uft.edu/help';
      }
    }
    
    // Fix activities section: replace overlay-only images with text-wrap layout
    var activitiesSection = document.querySelector('[id="activities"]');
    if(activitiesSection && !activitiesSection.dataset.fixed){
      activitiesSection.dataset.fixed = '1';
      var galleryDiv = activitiesSection.querySelector('.gallery');
      if(galleryDiv){
        var icons = ['fa-running','fa-dumbbell','fa-hiking','fa-heart'];
        var descriptions = [
          '15 competitive teams across basketball, swimming, football, and track.',
          'Strength training, recovery space, and performance support.',
          'Kayaking, hiking, weekend trips, and challenge-based activities.',
          'Yoga, wellness walks, and stress-management sessions for students.'
        ];
        var titles = ['Varsity Athletics','Titan Gym and Recovery','Outdoor Adventure','Wellbeing in Motion'];
        var imgs = [
          "\\wsl.localhost\Ubuntu-22.04\var\www\cohorts\cs-year-1\students\Universit.png",
          'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200',
          'https://images.unsplash.com/photo-1518602164578-cd0074062767?w=1200',
          'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200'
        ];
        var cardsHtml = '<div style="display:grid;gap:20px;margin:20px 0">';
        for(var i=0;i<4;i++){
          var layout = i%2===0 ?
            '<div class="card" style="overflow:hidden;padding:0"><div style="display:grid;grid-template-columns:1.2fr 1fr;gap:0;min-height:260px"><img src="'+imgs[i]+'" alt="'+titles[i]+'" style="width:100%;height:100%;object-fit:cover;display:block"><div style="padding:28px;display:flex;flex-direction:column;justify-content:center"><h3 style="color:var(--secondary);margin-bottom:10px;font-size:1.3rem"><i class="fas fa-'+icons[i]+'" style="color:var(--primary);margin-right:8px"></i>'+titles[i]+'</h3><p style="color:var(--muted);line-height:1.8;font-size:.95rem">'+descriptions[i]+'</p><div style="margin-top:14px"><span style="background:#fff7ed;color:var(--primary);padding:4px 12px;border-radius:999px;font-size:.75rem;font-weight:700">Active Program</span></div></div></div></div>' :
            '<div class="card" style="overflow:hidden;padding:0"><div style="display:grid;grid-template-columns:1fr 1.2fr;gap:0;min-height:260px"><div style="padding:28px;display:flex;flex-direction:column;justify-content:center"><h3 style="color:var(--secondary);margin-bottom:10px;font-size:1.3rem"><i class="fas fa-'+icons[i]+'" style="color:var(--primary);margin-right:8px"></i>'+titles[i]+'</h3><p style="color:var(--muted);line-height:1.8;font-size:.95rem">'+descriptions[i]+'</p><div style="margin-top:14px"><span style="background:#fff7ed;color:var(--primary);padding:4px 12px;border-radius:999px;font-size:.75rem;font-weight:700">Active Program</span></div></div><img src="'+imgs[i]+'" alt="'+titles[i]+'" style="width:100%;height:100%;object-fit:cover;display:block"></div></div>';
          cardsHtml += layout;
        }
        cardsHtml += '</div>';
        galleryDiv.insertAdjacentHTML('beforebegin', cardsHtml);
        // Remove old gallery overlay cards and old details
        var oldDetails = activitiesSection.querySelectorAll('details.card');
        oldDetails.forEach(function(d){d.remove()});
        galleryDiv.remove();
      }
    }
  });
  observer.observe(document.getElementById('sectionRoot'),{childList:true,subtree:true});
})();