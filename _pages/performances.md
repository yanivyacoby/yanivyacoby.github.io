---
layout: page
title: Performances
hide_title: true
permalink: /performances/
nav: false
horizontal: false
---

<center>
<h2>Upcoming Events</h2>
None at the moment, but stay tuned!
</center>


<center>
<h2>Past Events</h2>
</center>

<table class="events-table">
{% for performance in site.data.performances %}
    <tbody>
    <tr>
        <td colspan="100%"><strong>{{ performance.title }}</strong></td>
    </tr>
    <tr>
        <td><i class="fas fa-location-dot" style="padding-right: 10px;"></i></td>
        <td>
	    {% if performance.address %}
            <a href="https://maps.google.com/?q='{{ performance.address }}'">{{ performance.location }}</a>
	    {% else %}
	    {{ performance.location }}
	    {% endif %}
        </td>
    </tr>
    <tr>
        <td><i class="fas fa-calendar-days" style="padding-right: 10px;"></i></td>
        <td>
            {{ performance.date | date: "%a, %B %d, %Y at %l:%M%P"}}
        </td>
    </tr>
    <tr>
        <td><i class="fas fa-circle-info" style="padding-right: 10px;"></i></td>
        <td>
        {{ performance.description }}
	{% if performance.url %}
	More info <a href="{{ performance.url }}">here</a>.
	{% endif %}
        </td>
    </tr>
    </tbody>
{% endfor %}
</table>

