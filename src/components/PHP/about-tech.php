<?php
$about_tech_title        = get_field('about_tech_title');
$about_tech_subtitle     = get_field('about_tech_subtitle');
$about_tech_box_header   = get_field('about_tech_box_header');
$about_tech_box_heading  = get_field('about_tech_box_heading');
$about_tech_box_content  = get_field('about_tech_box_content');
$about_tech_image        = get_field('about_tech_image');
?>
	<section class="section-tech">
		<div class="container-full">
			<div class="tech-content">
                <?php if($about_tech_title): ?>
				<h2 class="section-title left" data-ripple-text data-ripple-text-types="words" data-ripple-text-delay="0.07"><?php echo wp_kses_post($about_tech_title); ?></h2>
                <?php endif; ?>
                <?php if($about_tech_subtitle): ?>
				<p class="tech-subtitle" data-aos="fade-up" data-aos-delay="100"><?php echo wp_kses_post($about_tech_subtitle); ?></p>
                <?php endif; ?>
				<div class="tech-box" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                    <?php if($about_tech_box_header): ?>
					<div class="tech-box__header"><?php echo esc_html($about_tech_box_header); ?></div>
                    <?php endif; ?>
					<div class="tech-box__body">
                        <?php if($about_tech_box_heading): ?>
						<div class="tech-box__heading"><?php echo esc_html($about_tech_box_heading); ?></div>
                        <?php endif; ?>
                        <?php if($about_tech_box_content): ?>
						<div class="tech-box__content">
							<?php echo wp_kses_post($about_tech_box_content); ?>
						</div>
                        <?php endif; ?>
					</div>
				</div>
			</div>
            <?php if($about_tech_image): ?>
			<div class="tech-image" data-aos="fade-left" data-aos-duration="1100" data-aos-delay="150">
					<img class="lozad" data-src="<?php echo esc_url($about_tech_image['url']); ?>" alt="<?php echo esc_attr($about_tech_image['alt']); ?>" />
			</div>
            <?php endif; ?>
		</div>
	</section>
