<?php
$about_intro_label   = get_field('about_intro_label');
$about_intro_title   = get_field('about_intro_title');
$about_intro_col1    = get_field('about_intro_col1');
$about_intro_col2    = get_field('about_intro_col2');
$about_intro_image   = get_field('about_intro_image');
?>
	<section class="section-about-intro">
		<div class="container-full">
			<div class="about-content">
                <?php if($about_intro_label): ?>
				<p class="about-label" data-aos="fade-up"><?php echo esc_html($about_intro_label); ?></p>
                <?php endif; ?>
                <?php if($about_intro_title): ?>
				<h2 class="about-title" data-ripple-text data-ripple-text-types="lines" data-ripple-text-delay="0.08"><?php echo wp_kses_post($about_intro_title); ?></h2>
                <?php endif; ?>
                <?php if($about_intro_col1 || $about_intro_col2): ?>
				<div class="about-body" data-stagger data-stagger-delay="0.1" data-stagger-duration="0.7">
                    <?php if($about_intro_col1): ?>
					<div class="about-body__col" data-stagger-item>
						<?php echo wp_kses_post($about_intro_col1); ?>
					</div>
                    <?php endif; ?>
                    <?php if($about_intro_col2): ?>
					<div class="about-body__col" data-stagger-item>
						<?php echo wp_kses_post($about_intro_col2); ?>
					</div>
                    <?php endif; ?>
				</div>
                <?php endif; ?>
			</div>
            <?php if($about_intro_image): ?>
			<div class="about-image" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
				<img class="lozad" data-src="<?php echo esc_url($about_intro_image['url']); ?>" alt="<?php echo esc_attr($about_intro_image['alt']); ?>" />
			</div>
            <?php endif; ?>
		</div>
	</section>
