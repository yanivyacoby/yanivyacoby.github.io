---
layout: page
title: Music
permalink: /music
nav: true
nav_order: 5
display_categories: [collaborations, discography, misc]
horizontal: false
dropdown: true
children: 
    - title: Listen & Watch
      permalink: /music
    - title: divider
    - title: Performances
      permalink: /performances
---


I've had the privilege of collaborating with numerous musicians in the Boston area, including fiddler [Eric Boodman](/music/duo-with-eric), baroque violin/nyckelharpa player [Anna Breger](https://annabreger.com), accordionist/singer [Sunniva Brynnel](/music/duo-with-sunniva), pianist [Chase Morrin](/music/the-corn-knight), ensembles [Blue Thread](/music/all-over-the-map) and Fade Blue. In 2016, I released my debut album [The Corn Knight](/music/the-corn-knight), an hour long story piece for piano/marimba duo, in collaboration with Chase Morrin. While at the New England Conservatory, I had the privilege of studying with [Carla Kihlstedt](http://carlakihlstedt.com), [Cristi Catt](http://www.cristicatt.com), [Win Horan](https://www.winifred-horan.com), [Hankus Netsky](https://necmusic.edu/faculty/hankus-netsky), [Eden MacAdam-Somer](https://www.fiddlegarden.com) and [Dan Bauch](https://www.bso.org/profiles/daniel-bauch). 


<!-- pages/projects.md -->
<div class="projects">
{%- if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {%- for category in page.display_categories %}
  <h2 class="category">{{ category }}</h2>
  {%- assign categorized_projects = site.music | where: "category", category -%}
  {%- assign sorted_projects = categorized_projects | sort: "importance" %}
  <!-- Generate cards for each project -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for project in sorted_projects -%}
      {% include projects_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for project in sorted_projects -%}
      {% include projects.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
  {% endfor %}

{%- else -%}
<!-- Display projects without categories -->
  {%- assign sorted_projects = site.music | sort: "importance" -%}
  <!-- Generate cards for each project -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for project in sorted_projects -%}
      {% include projects_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for project in sorted_projects -%}
      {% include projects.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
{%- endif -%}
</div>

