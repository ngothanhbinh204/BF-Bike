<?php
$home_posts_title = get_field('home_posts_title');
// $home_posts_categories = get_field('home_posts_categories');
$all_categories = get_categories();

$home_posts_button = get_field('home_posts_button');
?>
	<section class="section-posts">
		<div class="section-bg"><img class="lozad" data-src="<?php echo THEME_URI; ?>/UI/img/bg-post.png" alt="" />
		</div>
		<div class="container">
            <?php if($home_posts_title): ?>
			<h2 class="section-title" data-ripple-text data-ripple-text-types="words" data-ripple-text-delay="0.07"><?php echo wp_kses_post($home_posts_title); ?></h2>
            <?php endif; ?>
			<nav class="post-filter-nav" aria-label="Lọc bài viết" data-aos="fade-up" data-aos-delay="150">
				<button class="filter-btn is-active" data-filter="all">Tất cả</button>
                <?php 
                if($all_categories): 
                    foreach($all_categories as $cat):
                ?>
				<button class="filter-btn" data-filter="<?php echo esc_attr($cat->slug); ?>"><?php echo esc_html($cat->name); ?></button>
                <?php 
                    endforeach;
                endif; 
                ?>
			</nav>
			<div class="swiper-wrap" data-aos="fade-up" data-aos-delay="250" data-aos-duration="800">
				<div class="swiper swiper-posts">
					<div class="swiper-wrapper">
                        <?php 
                        $args = array(
                            'post_type' => 'post',
                            'posts_per_page' => 10,
                            'tax_query' => array(
                                array(
                                    'taxonomy' => 'category',
                                    'field'    => 'term_id',
                                    'terms'    => wp_list_pluck($all_categories, 'term_id'),
                                ),
                            ),
                        );

                        $posts_query = new WP_Query($args);
                        if ($posts_query->have_posts()) :
                            while ($posts_query->have_posts()) : $posts_query->the_post();
                                $categories = get_the_category();
                                $cat_slugs = array_map(function($c) { return $c->slug; }, $categories);
                                $cat_name = !empty($categories) ? $categories[0]->name : '';
                                $cat_link = !empty($categories) ? get_category_link($categories[0]->term_id) : '';
                        ?>
						<div class="swiper-slide" data-category="<?php echo esc_attr(implode(' ', $cat_slugs)); ?>">
							<article class="post-item">
                                <a class="post-item__thumb" href="<?php the_permalink(); ?>">
									<div class="img-ratio ratio:pt-[230_300]">
                                        <img class="lozad" data-src="<?php echo get_the_post_thumbnail_url(get_the_ID(), 'large'); ?>" alt="<?php echo esc_attr(get_the_title()); ?>" />
									</div>
								</a>
								<div class="post-item__body">
									<div class="post-item__meta">
                                        <?php if($cat_link): ?>
                                        <a class="post-item__cat" href="<?php echo esc_url($cat_link); ?>"><?php echo esc_html($cat_name); ?></a><span class="post-item__sep">|</span>
                                        <?php endif; ?>
                                        <span class="post-item__date"><?php echo get_the_date('d.m.Y'); ?></span>
                                    </div>
                                    <a class="post-item__title" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
								</div>
							</article>
						</div>
                        <?php 
                            endwhile;
                            wp_reset_postdata();
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
            <?php if($home_posts_button): ?>
			<div class="section-center-cta"><a class="btn btn-primary-outline" href="<?php echo esc_url($home_posts_button['url']); ?>"><span><?php echo esc_html($home_posts_button['title']); ?></span><i
						class="fa-regular fa-arrow-right"></i></a></div>
            <?php endif; ?>
		</div>
	</section>
