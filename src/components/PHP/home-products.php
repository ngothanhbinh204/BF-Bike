<?php
$home_products_title = get_field('home_products_title');
$home_products_selected = get_field('home_products_selected');
$home_products_button = get_field('home_products_button');
?>
	<section class="section-products">
		<div class="container">
            <?php if($home_products_title): ?>
			<h2 class="section-title" data-ripple-text data-ripple-text-types="words" data-ripple-text-delay="0.07"><?php echo wp_kses_post($home_products_title); ?></h2>
            <?php endif; ?>
			<div class="swiper-wrap" data-aos="fade-up" data-aos-delay="150" data-aos-duration="800">
				<div class="swiper swiper-products">
					<div class="swiper-wrapper">
                        <?php 
		if ($home_products_selected) : 
			global $product;
			foreach($home_products_selected as $product_id):
				$product = wc_get_product($product_id);
				if(!$product) continue;
		?>
			<div class="swiper-slide">
			<?php
				wc_get_template_part("content", "product");
			?>
		</div>
		<?php 
			endforeach; 
		endif;
		?>

					</div>
				</div>
				<div class="wrapper-controll">
					<button class="btn btn-slide btn-swiper-prev btn-slide-1 btn-slide"><i
							class="fa-regular fa-angle-left"></i>
					</button>
					<button class="btn btn-slide btn-swiper-next btn-slide-1 btn-slide"><i
							class="fa-regular fa-angle-right"></i>
					</button>
				</div>
			</div>
            <?php if($home_products_button): ?>
			<div class="section-center-cta" data-aos="fade-up"><a class="btn btn-primary-outline" href="<?php echo esc_url($home_products_button['url']); ?>"><span><?php echo esc_html($home_products_button['title']); ?></span><i
						class="fa-regular fa-arrow-right"></i></a></div>
            <?php endif; ?>
		</div>
	</section>
