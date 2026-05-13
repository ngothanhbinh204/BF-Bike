<?php
$about_help_title = get_field('about_help_title');
$about_help_list = get_field('about_help_list');
?>
	<section class="section-help">
		<div class="container">
            <?php if($about_help_title): ?>
			<h2 class="section-title" data-ripple-text data-ripple-text-types="chars" data-ripple-text-delay="0.05"><?php echo wp_kses_post($about_help_title); ?></h2>
            <?php endif; ?>
            
            <?php if($about_help_list): ?>
			<div class="help-list" data-stagger data-stagger-delay="0.12" data-stagger-duration="0.65">
                <?php foreach($about_help_list as $item): ?>
                <a class="help-item" href="#!" data-stagger-item>
					<div class="help-item__top">
						<h3 class="help-item__title"><?php echo wp_kses_post($item['title']); ?></h3>
                        <?php if($item['icon']): ?>
                        <img class="help-item__icon" src="<?php echo esc_url($item['icon']['url']); ?>" alt="<?php echo esc_attr($item['icon']['alt']); ?>">
                        <?php endif; ?>
					</div>
					<div class="help-item__desc"><?php echo wp_kses_post($item['desc']); ?></div>
				</a>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>
		</div>
	</section>
