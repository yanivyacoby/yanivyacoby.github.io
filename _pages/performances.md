---
layout: page
title: Performances
hide_title: true
permalink: /performances
nav: false
horizontal: false
---

{% assign current_date = site.time | date: "%Y-%m-%d %H:%M" %}


<center>
<h2>Upcoming Events</h2>
</center>

{% include performance_list.html keep="upcoming" %}

<p></p>

<center>
<h2>Past Events</h2>
</center>

{% include performance_list.html keep="past" %}
