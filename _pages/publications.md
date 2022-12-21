---
layout: page
permalink: /publications/
title: Publications
years: [2023, 2022, 2020, 2019]
nav: true
nav_order: 1
---
<!-- _pages/publications.md -->
<div class="publications">

  I served as a direct <strong>research mentor</strong> to the undergraduate/Master's co-authors whose names are <span style="border-bottom: 1px dashed;">underlined</span>. 

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
