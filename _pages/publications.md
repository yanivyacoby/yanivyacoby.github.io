---
layout: page
permalink: /publications/
title: Publications
years: [2022, 2020, 2019]
nav: true
---
<!-- _pages/publications.md -->
<div class="publications">

Co-authors whose names are <span style="border-bottom: 1px dashed;">underlined</span> were undergraduate or Master's students at time of publication. 

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
